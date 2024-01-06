//Logic for the chatrooms
const Chatroom = require("../models/chatroomModel");

// Create chatroom
const createChatRoom = async (req, res) => {
   try {
      const { name } = req.body;
      const existingRoom = await Chatroom.findOne({ name });

      if (existingRoom) {
         return res.status(409).json({ status: 409, message: "Roomname exists" });
      } else {
         const room = new Chatroom({ name });
         await room.save();
         return res.status(201).json({ status: 201, message: "Room created" });
      }
   } catch (e) {
      console.error(e)
      return res.status(500).json({ status: 500, message: "An error occurred" });
   }
};

// Get all chatrooms
const getAllRooms = async (req, res) => {
   try {
      const allRooms = await Chatroom.find({}); // Fetch all chat rooms
      return res.status(200).json({ status: 200, data: allRooms });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, message: "An error occurred" });
   }
};

const deleteRoom = async (req, res) => {
   const id = req.params.id;

   try {
      const existingRoom = await Chatroom.findById(id);

      if (!existingRoom) {
         return res.status(404).json({ status: 404, message: "Chatroom doesn't exist" });
      }

      // Delete the chatroom using the id
      await Chatroom.findByIdAndDelete(id);

      return res.status(204).json({ status: 204, message: "Chatroom deleted successfully" });
   } catch (e) {
      console.error("Error deleting chatroom", e);
      return res.status(500).json({ status: 500, message: "An error occurred while deleting the chatroom" });
   }
};
const getRoom = async (req, res) => {
   try {
      const id = req.params.id;


      const existingRoom = await Chatroom.findById(id).populate('messages')
     
      if (existingRoom) {
         const urlLink = `/chatroom/${id}`;
        
         return res.status(200).json({existingRoom, urlLink });
        
      } else {

         return res.status(404).json({ message: "Chatroom not found" });
      }
   } catch (e) {
      // Handle any errors that occur during the process
      console.error(e);
      return res.status(500).json({ message: "An error occurred" });
   }
};


module.exports = { createChatRoom, getAllRooms, deleteRoom, getRoom };
