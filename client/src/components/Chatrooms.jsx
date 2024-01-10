import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Chatrooms = () => {
  const [roomName, setRoomName] = useState('');
  const [roomData, setRoomData] = useState([
    {
      _id: "419",
      name: "Loading...",
      "members": 0,
      "messages": 0
    }
  ]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios.get('https://chatapp-backend-htbo.onrender.com/chatroom')
      .then((res) => {
        setRoomData(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error('Error fetching data', err))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://chatapp-backend-htbo.onrender.com/chatroom',
        { name: roomName }).then((res) => {
          toast.success('Created chatroom');
          fetchData(); // Refresh room data after creating a chatroom
        }).catch((err) => toast.error('Some weird error'))
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (uid) => {
    await axios.delete(`https://chatapp-backend-htbo.onrender.com/chatroom/${uid}`)
      .then(res => {
        if (res.status == 204) {
          toast.success("Deleted chatroom");
        }
        else {
          toast.error("Something went wrong")
        }
      })
  }

  const goToRoom = async (uid) => {
     await axios.get(`https://chatapp-backend-htbo.onrender.com/chatroom/${uid}`)
     .then(res => {
        console.log(res.data.existingRoom.messages) //Accesses the messages available
        toast.success(`Redirecting to ${res.data.existingRoom.name}...`);
        setInterval(() => {
          navigate(res.data.urlLink);
        }, 3000)
       }).catch((err) => {
         toast.error("Something went wrong")
       })
  } 
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className="container">
        <h1 className="text text-xxl font-bold text-white p-6" style={{ fontFamily: 'Poppins' }}>
          Chatrooms
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center">
            <input
              className="h-9 rounded text-white outline-none px-3 w-2/4"
              type="text"
              name="roomname"
              value={roomName}
              onChange={handleRoomNameChange}
              placeholder="New Chatroom"
            />
            <input
              type="submit"
              className="bg-green-500 text-white rounded h-10 mx-2 px-3"
              value="Create"
            />
          </div>
        </form>
      </section>
      <section className="container">
        <p className="text text-xl m-5">Here are the available chatrooms</p>
        {/* <Loader /> */}
        {roomData.map((room) => (
          <div key={room._id} className="flex flex-row items-center border border-white border-solid hover:border-4 hover:border-white rounded my-5 w-2/4"
            onClick={() => {goToRoom(room._id)}}
          >
            <div className="flex flex-col flex-1">
              <p className="text-white font-bold py-2" style={{ fontFamily: "Poppins" }}>{room.name}</p>
            
              <p className="text-sm py-2">{`Member Count: ${room.members.length}`}</p>
            </div>
            <div className="flex items-center">
            <span className="bg-green-500 rounded-full p-2 w-full h-full">
              <p className="text-sm">{`${room.messages.length}`}</p>
              </span>
              <button className="bg-red-500 p-2 m-3 rounded"
                onClick={() => { handleDelete(room._id) }}>
               <FaTrash/>
              </button>
            </div>
          </div>

        ))}
      </section>
    </>
  );
};

export default Chatrooms;
