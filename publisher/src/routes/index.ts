import { Router } from 'express';
import TopicController from '../controllers/topic';

const router = Router();

const topicController = new TopicController();

// subscribe to topic
router.post('/subscribe/:topic', topicController.subscribe);

// publish topic
router.post('/publish/:topic', topicController.publish);

export default router;
