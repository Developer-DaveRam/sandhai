import React from 'react';
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="bg-green-500 p-5 flex justify-center items-center w-full gap-3">
      {/* Location Dropdown */}
      <select className="px-8 py-3    border rounded-md bg-white shadow-md">
        <option>Coimbatore</option>
        <option>Chennai</option>
        <option>Bangalore</option>
      </select>
      
      {/* Search Input */}
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-md w-1/2">
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
      <select className="p-5 border rounded-md bg-white shadow-md">
        <option>English</option>
        <option>Tamil</option>
        <option>Hindi</option>
      </select>
    </div>
  );
};

export default SearchBar;