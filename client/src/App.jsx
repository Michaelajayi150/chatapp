import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Chatroom from './components/Chatrooms';
import WelcomePage from './components/WelcomePage';
import NotFound from './components/NotFound';

function App() {
  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatroom/:id" element={<Chat />} />
        <Route path="/chatrooms" element={<Chatroom />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
  );
}

export default App;
