const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Chat = require('../models/Chat');
const { body, validationResult } = require('express-validator');

// ROUTE 1: GET ALL CHATS FOR A PARTICULAR USER
router.get("/getallchats", fetchuser, async(req, res)=>{
    const chats = await Chat.find({ user: req.user.id });
    res.json(chats);
})

module.exports = router;