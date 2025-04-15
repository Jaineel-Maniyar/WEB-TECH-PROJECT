import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  
  // Categories for movies - you can customize these based on your needs
  const categories = [
    { name: "Action", id: "action" },
    { name: "Adventure", id: "adventure" },
    { name: "Animation", id: "animation" },
    { name: "Comedy", id: "comedy" },
    { name: "Crime", id: "crime" },
    { name: "Drama", id: "drama" },
    { name: "Fantasy", id: "fantasy" },
    { name: "Horror", id: "horror" },
    { name: "Mystery", id: "mystery" },
    { name: "Romance", id: "romance" },
    { name: "Sci-Fi", id: "sci-fi" },
    { name: "Thriller", id: "thriller" }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Animation variants
  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 left-0 h-full w-80 bg-gray-900 z-50 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <Link to="/" className="text-2xl font-bold text-yellow-400" onClick={onClose}>
                WatchWise
              </Link>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="p-6">
              {/* Quick Links */}
              <div className="mb-8">
                <h3 className="text-gray-400 uppercase text-sm font-semibold mb-4">Quick Links</h3>
                <nav className="space-y-3">
                  <motion.div variants={itemVariants}>
                    <Link 
                      to="/" 
                      className="flex items-center text-white hover:text-yellow-400 transition-colors"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Link 
                      to="/watchlist" 
                      className="flex items-center text-white hover:text-yellow-400 transition-colors"
                      onClick={onClose}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Watchlist
                    </Link>
                  </motion.div>
                </nav>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="text-gray-400 uppercase text-sm font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category, index) => (
                    <motion.div 
                      key={category.id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <Link 
                        to={`/category/${category.id}`} 
                        className="block text-white hover:text-yellow-400 transition-colors"
                        onClick={onClose}
                      >
                        {category.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
              <motion.div variants={itemVariants}>
                <Link 
                  to="/sign-in" 
                  className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-full font-medium transition-colors"
                  onClick={onClose}
                >
                  Sign In / Register
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}