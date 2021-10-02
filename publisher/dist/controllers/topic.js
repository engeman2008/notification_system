"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const axios_1 = tslib_1.__importDefault(require("axios"));
class TopicController {
    constructor() {
        this.subscribe = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('subscribe');
            const { topic } = req.params;
            const { url } = req.body;
            const topicExists = this.doesTopicExists(topic);
            if (topicExists) {
                const urlExists = this.database.getData(`topics/${topic}`).filter((row) => (row.url === url));
                if (urlExists.length > 0) {
                    return res.status(409).json({ message: 'url already subscribed' });
                }
            }
            this.database.push(`topics/${topic}[]`, { url }, true);
            console.log(this.database.getData(topic));
            return res.status(200).json({ url, topic });
        });
        this.publish = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('publish');
            const { topic } = req.params;
            const data = req.body;
            const topicExists = this.doesTopicExists(topic);
            if (!topicExists) {
                return res.status(404).json({ message: `Topic ${topic} not exists` });
            }
            const subscribers = this.database.getData(`topics/${topic}`);
            if (subscribers.length === 0) {
                return res.status(200).json({ message: 'Published to 0 subscribers' });
            }
            const payload = {
                topic,
                data,
            };
            const actions = subscribers.map((row) => axios_1.default.post(row.url, payload));
            try {
                const response = yield Promise.all(actions);
                return res.status(200).json({ message: `Published to ${subscribers.length} subscribers` });
            }
            catch (error) {
                return res.status(404).json({ message: `Failed to publish to url ${error.config.url} with error messsage ${error.message}` });
            }
        });
        this.database = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config('eventbus', true, true, '/'));
        this.database.delete('topics');
    }
    doesTopicExists(topic) {
        try {
            // check if topic exists
            this.database.getData(`topics/${topic}`);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = TopicController;
