import React, { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { BiImages } from 'react-icons/bi';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const [previousChats, setPreviousChats] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [chatName, setChatName] = useState("")
  const fileInputRef = useRef(null);
  const formatTime = (timestamp) => {
    let date = new Date(timestamp)
    return date.toLocaleString()
  }
  
  // let token = localStorage.getItem("token")
  // let sentBy = JSON.parse(atob(token.split('.')[1])).username;

  useEffect(() => {
    try {
      const pathId = location.href.split("/")[4];

      const fetchChatInfo = async () => {
        const response = await fetch(`https://chatapp-backend-htbo.onrender.com/chatroom/${pathId}`)
        if (response.ok) {
          const existingData = await response.json()
          const cName = existingData.existingRoom.name
          setChatName(cName);
          const msgs = Array.isArray(existingData.existingRoom.messages)
            ? existingData.existingRoom.messages
            : []
          setPreviousChats(msgs);
        } else {
          toast.error("Something went wrong in fetching the previous chats")
        }
      }

      fetchChatInfo();
    } catch (e) {
      toast.error("Something went wrong in fetching the previous chats", e.msg);
    }
  }, [previousChats]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pathId = window.location.href.split("/")[4]
    console.log(pathId)

    const token = localStorage.getItem("token");

    const senderInfo = {
      sentBy: JSON.parse(atob(token.split('.')[1])).username,
      message: currentChat,
    }

    try {
      //options for fetch
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(senderInfo)
      }

      const response = fetch(`https://chatapp-backend-htbo.onrender.com/chatroom/${pathId}`, options)
      setCurrentChat("")
      if (response.ok) {
        const newMessage = await response.json()
        console.log("Submitted:", senderInfo)
      }
    } catch (e) {
      toast.error("Couldn't send message")
    }
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <Navbar />
      <div className="mx-auto flex items-center justify-between ">
        <a href="/chatrooms"
          className="w-1/3"
          style={{ fontSize: "30px", padding: "1.5rem", color: "white" }}>
          <FaArrowLeft />
        </a>
        <h1 className="text-white text-3xl font-extrabold w-1/3"
          style={{ fontFamily: "Poppins" }}>
          {chatName}
        </h1>
        <div className="w-1/3"></div>
      </div>

     
      <div className="chat-container p-4 overflow-y-auto">
        {previousChats.map((message, index) => (
          <div className="bg-red-500 text-white p-3 mb-5 rounded-lg w-3/5 break-words shadow-md" key={index}>
            <h2 className="text-md font-bold text-left">{message.sender}</h2>
           
            <p>{message.content}</p>
            <span className="text text-right">{formatTime(message.timestamp)}</span>
          </div>
        ))}
      </div>




      <div >
        <form
          className="chatform flex flex-row items-center gap-2 w-3/4"
          onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Say something nice"
            className="h-10 rounded outline-none px-3 w-full"
            autoComplete="off"
            value={currentChat}
            onChange={(e) => setCurrentChat(e.target.value)}
          />
          <BiImages
            style={{ fontSize: '25px', backgroundColor: 'transparent', cursor: 'pointer' }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
          <button type="submit" className="btn bg-blue-500 p-2 rounded" >
            <FaPaperPlane style={{ fontSize: "25px" }} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Chat;
