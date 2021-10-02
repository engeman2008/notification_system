/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import axios from 'axios';

interface Subscriber {
  url: string
}

class TopicController {
  private database;

  constructor() {
    this.database = new JsonDB(new Config('eventbus', true, true, '/'));
    this.database.delete('topics');
  }

  private doesTopicExists(topic: string): boolean {
    try {
      // check if topic exists
      this.database.getData(`topics/${topic}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  public subscribe = async (req: Request, res: Response, next: NextFunction) => {
    console.log('subscribe');
    const { topic } = req.params;
    const { url } = req.body;

    const topicExists = this.doesTopicExists(topic);

    if (topicExists) {
      const urlExists = this.database.getData(`topics/${topic}`).filter((row: Subscriber) => (row.url === url));
      if (urlExists.length > 0) {
        return res.status(409).json({ message: 'url already subscribed' });
      }
    }
    this.database.push(`topics/${topic}[]`, { url } as Subscriber, true);
    console.log(this.database.getData(topic));

    return res.status(200).json({ url, topic });
  }

  public publish = async (req: Request, res: Response, next: NextFunction) => {
    console.log('publish');
    const { topic } = req.params;
    const data = req.body;

    const topicExists = this.doesTopicExists(topic);
    if (!topicExists) {
      return res.status(404).json({ message: `Topic ${topic} not exists` });
    }
    const subscribers: Subscriber[] = this.database.getData(`topics/${topic}`);

    if (subscribers.length === 0) { return res.status(200).json({ message: 'Published to 0 subscribers' }); }

    const payload = {
      topic,
      data,
    };

    const actions = subscribers.map((row) => axios.post(row.url, payload));

    try {
      const response = await Promise.all(actions);
      return res.status(200).json({ message: `Published to ${subscribers.length} subscribers` });
    } catch (error: any) {
      return res.status(404).json({ message: `Failed to publish to url ${error.config.url} with error messsage ${error.message}` });
    }
  }
}

export default TopicController;
