import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="bg-black text-white px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left - Logo and Menu */}
          {/* Left - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                WatchWise
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-yellow-400 text-black px-3 py-1 rounded-md font-medium flex items-center"
            >
              <span className="mr-1">☰</span> Menu
            </button>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex items-center flex-1 justify-center px-6">
            <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full max-w-md">
              <div className="relative flex-1">
                <span className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search WatchWise"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 absolute left-230 w-20 h-11 top-1 font-medium rounded-md"
              >
                Search
              </button>
            </form>

          </div>

          {/* Right - Watchlist and Sign In */}
          <div className="flex items-center space-x-6">
            <Link
              to="/watchlist"
              className="flex items-center text-white hover:text-yellow-400 transition-colors"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Watchlist
            </Link>
            <Link
              to="/sign-in"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Menu Component */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
