const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  
  sender: {
      type: String, 
      required: true
  }, 
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat =  mongoose.model('chats', chatSchema);

module.exports = Chat;
