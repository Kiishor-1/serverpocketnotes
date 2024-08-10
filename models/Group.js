const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  totalMembers: {
    type: Number,
    default: 0,
  },
  groupBackground:{
    type:String
  }
});

module.exports = mongoose.model('Group', groupSchema);


