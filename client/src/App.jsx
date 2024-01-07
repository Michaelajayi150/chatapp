import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Chatrooms from './components/Chatrooms';
import WelcomePage from './components/WelcomePage';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatroom/:id" element={<Chat />}/>
        <Route path="/chatrooms/" element={<Chatrooms />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
