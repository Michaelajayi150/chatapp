import React from 'react';
import OdinLogo from '../assets/logo.svg';
import bgImage from '../assets/homebg.jpg';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'
const WelcomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
  };

  return (
    <div style={backgroundStyle}>
      <div className="container mx-auto">
       <Navbar/>
      </div>

      <h1 className="text font-bold">A new approach to chatting</h1>
      <p className="p-7">Odin Chat brings your social interactions to the next level and blah blah blah</p>
      <button className="bg-indigo-500 p-3 rounded" style={{fontFamily:"Poppins", fontSize:"20px", color: "white"}}>
        <Link to="/chatrooms" style={{fontFamily:"Poppins", fontSize:"20px", color: "white"}}>Start Chatting</Link>
        </button>
    </div>
  );
}

export default WelcomePage;
