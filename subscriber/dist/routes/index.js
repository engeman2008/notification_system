"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// subscribe to topic
router.post('/test1', (req, res) => {
    console.log('Endpoint test1 ', req.body);
    res.status(200).json({ success: true });
});
// publish topic
router.post('/test2', (req, res) => {
    console.log('Endpoint test2 ', req.body);
    res.status(200).json({ success: true });
});
exports.default = router;
