import React, { useEffect, useState } from 'react';
import { Search } from "lucide-react";
import location from '../../assets/searchbar/location.svg'
import language from '../../assets/searchbar/language.svg'

const SearchBar = () => {

const[location,setLocation] = useState("Loading.....")

const fetchLocation =() =>{
 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(
    (position) =>{
      const {latitude,longitude} = position.coords;
      getCityName(latitude,longitude);
    },
      () =>setLocation("Location Access Denied")
  )
 }
}


const getCityName = async(lat,lon) =>{
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    const data = await res.json()
    setLocation(data.address.city || "unknown Location")
  } catch (error) {
    setLocation("Error fetching location")
  }
}


useEffect(()=>{
  fetchLocation()
},[])


  return (
    <div className="bg-green-500 p-5   flex justify-center items-center w-full gap-13">
      {/* Location Dropdown */}
      <div className="relative">
  <select 
    className="pl-10 pr-8 py-2 sm:py-3 border-0 rounded-md bg-white shadow-md appearance-none 
               w-full sm:w-auto text-sm sm:text-base text-center"
  >
    <option>{location}</option>
    <option>Coimbatore</option>
    <option>Chennai</option>
    <option>Bangalore</option>
  </select>
  {/* Custom Dropdown Arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg 
      className="w-4 h-4" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>

      {/* Search Input */}
      <div className="flex items-center bg-white border-0 rounded-md overflow-hidden shadow-md w-1/2">
        <input 
          type="text" 
          placeholder="Search for product..." 
          className="flex-grow p-4  outline-none"
        />
        <button className="p-2 m-2 rounded-md  bg-green-600 text-white">
          <Search size={20} />
        </button>
      </div>
      
      {/* Language Dropdown */}
      <select className="p-5 border-0 rounded-md overflow-hidden bg-white shadow-md">
        <option>English</option>
        <option>Tamil</option>
        <option>Hindi</option>
      </select>
    </div>
  );
};

export default SearchBar;