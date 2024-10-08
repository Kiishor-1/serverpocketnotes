// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     // required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email:{
//     type:String,
//     required:true,
//   },
//   bio: {
//     type: String,
//     default: '',
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   active: {
//     type: Boolean,
//     default: false,
//   },
//   lastActive: {
//     type: Date,
//   },
//   totalMessages: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   groups: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Group',
//   }],
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
  },
  totalMessages: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }],
});

module.exports = mongoose.model('User', userSchema);
