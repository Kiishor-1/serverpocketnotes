const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');
const Member = require('../models/Member');
const authMiddleware = require('../middlewares/authMiddleware');


// Route to fetch all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch a single group
router.get('/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:groupId/members', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group.members);
  } catch (error) {
    console.error('Error fetching group members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to create a new group
router.post('/', async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      return res.status(404).json({ message: 'Please fill all the required fields' });
    }

    // Check if the group already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group already exists' });
    }

    // Create a new group
    const group = new Group({
      name,
      color,
      members: [],
      messages: [],
      totalMembers: 0,
      groupBackground:color
    });

    const newGroup = await group.save();
    console.log(newGroup)

    res.status(201).json({ message: 'Group created successfully', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Route to join a group
router.post('/:groupId/join', authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const userId = req.user._id;
    const isMember = group.members.some(member => member.userId.toString() === userId.toString());
    if (isMember) {
      return res.status(400).json({ message: 'Already a member of the group' });
    }

    const member = new Member({
      username: req.user.username,
      joinDate: new Date(),
      isActive: true,
      userId: userId, // Store userId
    });

    await member.save();
    group.members.push(member._id);
    await group.save();

    const user = await User.findById(userId);
    user.groups.push(group._id);
    await user.save();

    res.json({ message: 'Successfully joined the group' });
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;