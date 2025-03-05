import React, { useEffect, useState } from 'react';
import bell from '../../assets/bell.png';
import cart from '../../assets/cart.png';
import { jwtDecode } from 'jwt-decode';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userAvatar from '../../assets/login/avathar.png'

const Header = ({ openLogin }) => {
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



    const handleLogout = async() => {
        try {
            const browser_token = localStorage.getItem("browser_token")
            const Logout = await axios.delete("http://localhost:8000/logout", {
                data: { browser_token },  
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("responce" ,Logout);                
            localStorage.removeItem("token");
            localStorage.removeItem("browser_token")
            setDecoded(null);
            window.location.reload();

        } catch (error) {
            console.log(error);           
            
        }     
    };




    const handleProtected = async () => {
        try {
            const sample = await apiRequest("GET", "http://localhost:8000/protected");
            console.log("Protected Data:", sample);
        } catch (error) {
            console.error("Access Denied:", error.response?.data?.message || error);
        }
    };

    return (
        <div className="bg-green-700 flex flex-wrap items-center justify-between h-24 w-full px-4 md:px-2"
            style={{ position: "sticky", top: "0", zIndex: "100" }}>

            <h3 className="text-white text-xl font-semibold">Logo</h3>

            <div className='flex flex-col sm:flex-row items-center gap-2'>
                <select className="bg-blue-100 text-center h-8 w-28 rounded-md">
                    <option>Coimbatore</option>
                    <option>Salem</option>
                    <option>Kerala</option>
                </select>
                <input
                    className="w-30 sm:w-60 md:w-60 h-8 bg-blue-100 border-none rounded-md px-2"
                    placeholder="Search..."
                />
            </div>

            <button className="bg-red-800 text-white h-8 sm:w-20 md:w-24 rounded-md">
                Sell Now !
            </button>

            <button onClick={handleProtected}>Protection Check</button>

            <div className="flex items-center gap-x-4 justify-center sm:justify-end relative">
                <img className="w-5 h-5" src={bell} alt="bell" />
               
                {decoded ? (
                    <div className="relative ">
                        <div className="flex flex-end items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                            <img className="w-8 h-8 rounded-full" src={userAvatar} alt="User Avatar" />
                            <span className="text-white">{decoded.email}</span>
                        </div>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                <p className="px-4 py-2 text-gray-700">{decoded.email}</p>
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={openLogin} className="bg-blue-700 text-white px-3 py-1 rounded-md">Sign Up</button>
                )}

                <img className="w-5 h-5" src={cart} alt="cart" />
            </div>
        </div>
    );
}

export default Header;
