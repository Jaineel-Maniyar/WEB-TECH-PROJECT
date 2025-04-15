import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

// Store this in environment variables in production
const API_KEY = "66e09c1f"; 

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query, category } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let apiUrl;
        
        if (query) {
          // Search query route
          apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
        } else if (category) {
          // Category route
          apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}&type=movie`;
        } else {
          // Default route - fetch popular movies
          apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`;
        }
        
        const response = await axios.get(apiUrl);
        
        if (response.data.Response === "True") {
          setMovies(response.data.Search || []);
        } else {
          setMovies([]);
          setError(response.data.Error);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("An error occurred while fetching movies");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [query, category]);

  // Determine page title based on params
  const getPageTitle = () => {
    if (query) return `Search Results: ${query}`;
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)} Movies`;
    return "Popular Movies";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-xl text-red-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-400">No movies found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}