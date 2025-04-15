import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_KEY = "66e09c1f";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [error, setError] = useState("");

  // Debounce the search function
  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchMovies = (query) => {
    axios
      .get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      .then((res) => {
        if (res.data.Search) {
          setMovies(res.data.Search);
          setError("");
        } else {
          setMovies([]);
          setError("No movies found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies. Please try again.");
      });
  };

  // Use useCallback to memoize the debounced fetchMovies function
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 300), []);

  useEffect(() => {
    debouncedFetchMovies(search);
  }, [search, debouncedFetchMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    debouncedFetchMovies(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">WatchWise: Your Movie Database</h1>

      <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
        <div className="flex">
          <input
            type="text"
            id="movie-search"
            placeholder="Search for a movie..."
            value={search}
            onChange={handleInputChange}
            className="flex-grow px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-r-lg transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          !error && (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-400">No movies found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
