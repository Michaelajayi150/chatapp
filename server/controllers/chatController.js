const Chat = require("../models/chatModel");
const Chatroom = require("../models/chatroomModel");
const User = require("../models/userModel");

const sendChat = async (req, res) => {
  try {
    const chatroomId = req.params.id;
    const { sentBy, message } = req.body;

    const hello = await User.findOne({ "username": sentBy });

    if (!hello) {
      return res.status(404).json({ message: "Sender not found" });
    }

    
    const newChat = new Chat({ 
      sender: sentBy, 
      content: message
    });
    
    // Save the new chat message
    const savedChat = await newChat.save();

    // Update the chatroom's messages array with the new chat message ID
    const updatedChatroom = await Chatroom.findByIdAndUpdate(
      chatroomId, 
      { $push: { messages: savedChat._id } },
      { new: true }
    )

    console.log("Updated Chatroom:", updatedChatroom);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
};

module.exports = { sendChat };
