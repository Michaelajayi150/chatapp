const mongoose = require('mongoose');
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const chatroomSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // Reference to the User model
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Chat // Reference to the Message model
    },
  ],
  
 });
 chatroomSchema.virtual("url").get(() => {
  return `/chatroom/${this._id}`;
})
const Chatroom = mongoose.model('chatrooms', chatroomSchema);

module.exports = Chatroom;
