import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CategoryPill({ category }) {
  const navigate = useNavigate();

  // Format category for URL (replace spaces with hyphens)
  const categoryUrl = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full text-center transition-colors duration-300 text-white focus:outline-none"
      onClick={() => navigate(`/category/${categoryUrl}`)}
      aria-label={`Go to ${category} category`}
      type="button"
    >
      {category}
    </motion.button>
  );
}
