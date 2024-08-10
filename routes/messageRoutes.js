const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Group = require('../models/Group');
const Member = require('../models/Member')

// Route to send a message
router.post('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, content } = req.body;

    const newMessage = new Message({
      group: groupId,
      sender: userId,
      content,
    });

    await newMessage.save();

    await Group.findByIdAndUpdate(groupId, {
      $push: { messages: newMessage._id },
    });

    await Member.findOneAndUpdate({ userId }, { lastActive: new Date() });
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get messages in a group
router.get('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch messages and populate sender details
    const messages = await Message.find({ group: groupId })
      .populate({
        path: 'sender',
        select: 'username _id' // Include sender's username and _id
      });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

