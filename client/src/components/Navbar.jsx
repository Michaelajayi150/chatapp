import React, { useState } from 'react';
import OdinLogo from '../assets/logo.svg';
import { CgProfile } from 'react-icons/cg';
import { ToastContainer, toast } from "react-toastify"
import {Link} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
const Navbar = () => {
    // State to manage user login status
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage['token']);

    const handleLogout = () => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('token');
        // Update the isLoggedIn state to false
        setIsLoggedIn(false);
        toast.info("Logging out...");
        setTimeout(() => {window.location.href = "/login"}, 3000)
    };

    const populateUsername = () => {
        const token = localStorage.token;
        if (token.length > 0) {
            return JSON.parse(atob(token.split('.')[1])).username;
        } else {
            return 'User';
        }
    };

    return (
        <>
             <ToastContainer/>
            <div className="flex flex-row gap-8">
                <div className="brand flex flex-row gap-3 items-center">
                <Link to="/"><img src={OdinLogo} alt="Logo" /></Link>
                    <h2 className="text font-bold text-xl" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                        Odin Chat
                    </h2>
                </div>
                <div className="w-2/5"></div>
                {isLoggedIn ? (
                    <div className="flex flex-row items-center gap-4">
                        <div className="userdetails flex flex-row gap-4 justify-center">
                            <CgProfile style={{ fontSize: '40px' }} />
                            <div className="flex flex-col">
                            <p>Logged in as, </p>
                            <p className="text text-lg font-bold">{populateUsername()}</p>
                            </div>
                        </div>
                        <button
                            className="bg-red-400 p-2"
                            style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white', cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-4">
                        <Link to="/login" style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white' }}>
                            Log In
                        </Link>
                        <Link to="/signup" className="bg-indigo-400 p-2" style={{ fontFamily: 'Poppins', fontSize: '20px', color: 'white' }}>
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
