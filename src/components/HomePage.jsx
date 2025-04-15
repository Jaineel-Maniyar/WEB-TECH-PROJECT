import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryPill from '../components/CategoryPill';
import SearchBar from '../components/Searchbar';
import { Helmet } from 'react-helmet';


export default function HomePage() {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTrendingMovies([
      {
        id: 1,
        title: 'Dune: Part Two',
        rating: 8.7,
        year: 2024,
        poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
      },
      {
        id: 2,
        title: 'Oppenheimer',
        rating: 8.9,
        year: 2023,
        poster: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
      },
      {
        id: 3,
        title: 'The Batman',
        rating: 8.3,
        year: 2022,
        poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      },
      {
        id: 4,
        title: 'Poor Things',
        rating: 8.5,
        year: 2023,
        poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      },
      {
        id: 5,
        title: 'Gladiator II',
        rating: 9.1,
        year: 2024,
        poster: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',


      },
    ]);

    setCategories([
      'Action',
      'Drama',
      'Comedy',
      'Sci-Fi',
      'Horror',
      'Romance',
      'Thriller',
      'Documentary',
      'Western',
      'Historical',
      'Fantasy',
      'Animation'
      
    ]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Helmet>
        <title>WatchWise – Discover Movies & TV Shows</title>
        <meta
          name="description"
          content="Your ultimate destination for movie discovery and cinematic exploration."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center drop-shadow-2xl"
        >
          WatchWise
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-gray-300 text-center max-w-2xl"
        >
          Your ultimate destination for movie discovery and cinematic exploration
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-2xl mt-8"
        >
          <SearchBar placeholder="Search for movies, TV shows, actors..." />
        </motion.div>

        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#facc15' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/movies')}
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all"
          >
            🎬 Browse Movies
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/tv')}
            className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            📺 TV Shows
          </motion.button>
        </motion.div>

        <motion.a
          href="#content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 cursor-pointer animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517602302552-471fe67acf66')] bg-cover bg-center z-[-1]"
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Trending Movies */}
      <div id="content" className="container mx-auto px-4 py-16 space-y-24">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Trending Now
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/trending')}
              className="text-yellow-400 hover:underline font-semibold"
            >
              See all →
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingMovies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <MovieCard movie={movie} onClick={() => navigate(`/movies/${movie.id}`)} />
              </motion.div>
            ))}
          </div>
        </motion.section>
  


        {/* Featured Movie */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
            <img 
              src="https://en.towerofsaviors.com/wp-content/uploads/2024/04/image-31.png" 
              alt="Featured Movie" 
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl">
              <motion.div variants={itemVariants}>
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">Featured</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-3">The Galactic Odyssey</h2>
                <p className="text-gray-300 mb-6 text-lg">An epic space adventure that challenges the very nature of humanity and our place among the stars.</p>
                <div className="flex space-x-4">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    Add to Watchlist
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Categories Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Browse by Category
          </h2>
          
          <motion.div 
            className="ml-7 flex flex-wrap gap-3"
            variants={itemVariants}
          >
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full text-center transition-colors duration-300"
                onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              >
                {category}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        
        {/* Call to Action */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-3xl p-10 md:p-16 text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to track your favorite movies?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Create a free account to build your watchlist, rate movies, and get personalized recommendations.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-yellow-400/50"
          >
            Sign Up Now
          </motion.button>
        </motion.section>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/80 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-4 md:mb-0">
              WatchWise
            </h2>
            <div className="flex space-x-6">
              <a target='blank' href="https://www.imdb.com/" className="text-gray-400 hover:text-white transition">About</a>
              <a target='blank' href="https://www.instagram.com/jaineel_1711" className="text-gray-400 hover:text-white transition">Contact</a>
              <a target='blank' href="https://www.imdb.com/privacy/adpreferences/?ref_=pvc_redir" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a target='blank' href="https://play.google.com/store/apps/details?id=com.imdb.mobile&hl=en_IN" className="text-gray-400 hover:text-white transition">Get App</a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2025 WatchWise. All rights reserved. This is a fictional IMDb clone project.
          </div>
        </div>
      </footer>
    </div>
  );
}