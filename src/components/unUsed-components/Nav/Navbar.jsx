import React, { useEffect, useState } from 'react';
import { Search } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userAvatar from '../../assets/login/avathar.png';
import bell from '../../assets/bell.png';
import cart from '../../assets/cart.png';

const Navbar = ({ openLogin }) => {
  const [decoded, setDecoded] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
    <div className="bg-white shadow-md py-3 px-6 flex justify-between items-center w-full">
      <h3 className="text-green-700 text-xl font-semibold">Logo</h3>
      
      <div className="flex items-center bg-gray-100 rounded-lg p-2 space-x-2 w-full max-w-3xl">
        <select className="p-2 border rounded-md">
          <option>Coimbatore</option>
          <option>Chennai</option>
          <option>Bangalore</option>
        </select>
        <input type="text" placeholder="Search for product..." className="flex-grow p-2 border rounded-md" />
        <button className="p-2 bg-green-500 text-white rounded-md">
          <Search size={20} />
        </button>
        <select className="p-2 border rounded-md">
          <option>English</option>
          <option>Tamil</option>
          <option>Hindi</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <img className="w-5 h-5" src={bell} alt="Notifications" />
        {decoded ? (
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <img className="w-8 h-8 rounded-full" src={userAvatar} alt="User Avatar" />
              <span className="text-gray-700">{decoded.email}</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <p className="px-4 py-2 text-gray-700">{decoded.email}</p>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openLogin} className="bg-blue-700 text-white px-3 py-1 rounded-md">Sign Up</button>
        )}
        <img className="w-5 h-5" src={cart} alt="Cart" />
      </div>
    </div>
  );
};

export default Navbar;
