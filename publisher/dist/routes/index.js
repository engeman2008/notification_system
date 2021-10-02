"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const topic_1 = tslib_1.__importDefault(require("../controllers/topic"));
const router = express_1.Router();
const topicController = new topic_1.default();
// subscribe to topic
router.post('/subscribe/:topic', topicController.subscribe);
// publish topic
router.post('/publish/:topic', topicController.publish);
exports.default = router;
