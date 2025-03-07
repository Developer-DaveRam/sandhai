import React, { useEffect, useState } from 'react';
import { Home, Heart, MessageSquare, Bell, Menu, X } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userAvatar from '../../assets/login/avathar.png';
import logo from '../../assets/navbar/logo.svg';

const Navbar = ({ openLogin }) => {
  const [decoded, setDecoded] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const value = localStorage.getItem("token");
    if (!value) {
      console.log("No token found");
      return;
    }
    try {
      const user = jwtDecode(value);
      setDecoded(user);
    } catch (error) {
      console.error("Invalid token, clearing and redirecting...", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const browser_token = localStorage.getItem("browser_token");
      await axios.delete("http://localhost:8000/logout", {
        data: { browser_token },
        headers: { "Content-Type": "application/json" }
      });
      localStorage.removeItem("token");
      localStorage.removeItem("browser_token");
      setDecoded(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full">
      
      {/* Logo */}
      <div className="text-green-700 text-xl font-semibold">
        <img className="h-16 sm:h-20" src={logo} alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-16 text-gray-700">
        <div className="flex flex-col items-center cursor-pointer">
          <Home size={25} />
          <span className="text-sm">Home</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Heart size={25} />
          <span className="text-sm">Wishlist</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <MessageSquare size={25} />
          <span className="text-sm">Chat</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Bell size={25} />
          <span className="text-sm">Notification</span>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed bg-green-400 top-0 right-0 w-66 h-screen rounded-l-md shadow-lg md:hidden p-6">
          
          {/* Close Button (Top-Right) */}
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          > 
            <X size={28} />
          </button>

          {/* Mobile Menu Items */}
          <h2 className="text-4xl text-white text-left mb-4">Sandhai</h2>
          <hr className="bg-white w-3/4 mb-4" />
          
          <div className="flex flex-col gap-6 justify-between text-white">
            <div className="flex items-center cursor-pointer">
              <Home size={25} />
              <span className="text-sm ml-2">Home</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <Heart size={25} />
              <span className="text-sm ml-2">Wishlist</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <MessageSquare size={25} />
              <span className="text-sm ml-2">Chat</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <Bell size={25} />
              <span className="text-sm ml-2">Notification</span>
            </div>
          </div>

          {/* Authentication Buttons */}
          {decoded ? (
            <div className="mt-6">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img className="w-8 h-8 rounded-full" src={userAvatar} alt="User Avatar" />
                <span className="text-white">▼</span>
              </div>
              {showDropdown && (
                <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <p className="px-4 py-2 text-gray-700">{decoded.email}</p>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={ () =>{openLogin(),setMenuOpen(false)}}
              
              className="bg-blue-700 text-white px-4 py-2 rounded-md mt-6"
            >
              Sign Up
            </button>
          )}

        </div>
      )}

      {/* Post Ad & User Section */}
      <div className="hidden md:flex items-center gap-4">
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-3xl font-semibold">
          + POST AD
        </button>
        {decoded ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img className="w-8 h-8 rounded-full" src={userAvatar} alt="User Avatar" />
              <span className="text-gray-700">▼</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <p className="px-4 py-2 text-gray-700">{decoded.email}</p>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={openLogin} 
            className="bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
