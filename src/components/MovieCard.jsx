import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id || movie.imdbID}`)}
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-yellow-500/30 hover:shadow-xl">
        <div className="relative">
          <img 
            src={movie.poster || movie.Poster} 
            alt={movie.title || movie.Title} 
            className="w-full aspect-[2/3] object-cover"
          />
          {movie.rating && (
            <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 font-bold rounded-full h-10 w-10 flex items-center justify-center border-2 border-yellow-400">
              {movie.rating}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate text-white">{movie.title || movie.Title}</h3>
          <p className="text-gray-400 text-sm">{movie.year || movie.Year}</p>
        </div>
      </div>
    </motion.div>
  );
}