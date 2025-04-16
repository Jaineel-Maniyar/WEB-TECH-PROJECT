import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SearchBar({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-24 py-3 rounded-lg bg-gray-800/80 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
      />
      
      <div className="absolute left-3 z-10 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-0.2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <button 
        type="submit" 
        className="h-11 w-25 my-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg px-6 transition-colors"
      >
        Search
      </button>
    </form>
  );
}