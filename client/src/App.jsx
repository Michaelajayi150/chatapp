import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Chatrooms from './components/Chatrooms';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatroom/:id" element={<Chat />} />
        <Route path="/chatrooms" element={<Chatrooms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
