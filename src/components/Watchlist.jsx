import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
    setIsLoading(false);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (isLoading) {
    return (
      <div className="min-w-screen min-h-screen bg-black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen bg-black text-white">
      {/* Header section with title */}
      <div className="w-full py-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
            My Watchlist
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Keep track of movies you want to watch. Add movies to your watchlist from any movie page.
          </p>
        </div>
      </div>
      
      {/* Content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {watchlist.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {watchlist.map((movie) => (
                <motion.div 
                  key={movie.id} 
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  <MovieCard movie={movie} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(movie.id);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
                    aria-label="Remove from watchlist"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center text-center py-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg 
              className="w-24 h-24 text-gray-600 mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
              />
            </svg>
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md">Discover movies and add them to your watchlist by clicking the bookmark icon on any movie page.</p>
            <Link 
              to="/" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-colors shadow-lg flex items-center"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16l-4-4m0 0l4-4m-4 4h18" 
                />
              </svg>
              Browse Movies
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}