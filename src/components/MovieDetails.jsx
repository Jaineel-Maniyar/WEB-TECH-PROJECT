import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const sanitizeInput = (str) => {
  const div = document.createElement("div");
  div.innerText = str;
  return div.innerHTML;
};


const API_KEY = "66e09c1f"; // Replace with your OMDb API key

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    setError(null);

    // Format to proper IMDb ID - ensures all IDs start with "tt"
    const formattedId = id.startsWith('tt') ? id : `tt${id}`;

    axios
      .get(`https://www.omdbapi.com/?i=${formattedId}&apikey=${API_KEY}`)
      .then((res) => {
        if (res.data.Response === "False") {
          setError(res.data.Error || "Movie not found");
          setLoading(false);
          return;
        }

        setMovie(res.data);
        fetchTrailer(res.data.Title);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      });
    axios
      .get(`https://www.omdbapi.com/?i=${formattedId}&apikey=${API_KEY}&type=series`)
      .then((res) => {
        if (res.data.Response === "False") {
          setError(res.data.Error || "Series not found");
          setLoading(false);
          return;
        }
        

        setMovie(res.data);
        fetchTrailer(res.data.Title);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching series details:", err);
        setError("Failed to fetch series details. Please try again later.");
        setLoading(false);
      });


    // Load reviews and watchlist
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);

    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, [id]);
  const fetchTrailer = async (movieTitle) => {
    try {
      // For development purposes, let's mock a trailer URL instead of requiring the backend
      // You should replace this with your actual backend call when it's ready
      setTrailerUrl("https://www.youtube.com/embed/TcMBFSGVi1c");


      // Uncomment this when your backend is ready:
      // const res = await axios.get(`http://localhost:4000/api/trailer?movie=${movieTitle}`);
      // setTrailerUrl(res.data.trailerUrl);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating((prev) => (prev === rating ? 0 : rating));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRating || !userReview.trim()) {
      alert("Please provide a rating and a non-empty review!");
      return;
    }

    const isDuplicate = reviews.some(
      (r) => r.text.trim() === userReview.trim() && r.rating === selectedRating
    );

    if (isDuplicate) {
      alert("You’ve already submitted a review with the same text and rating.");
      return;
    }

    const newReview = {
      rating: selectedRating,
      text: userReview,
      date: new Date().toLocaleString(),
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setSelectedRating(0);
    setUserReview("");
  };

  const handleWatchlistToggle = () => {
    let updatedWatchlist;
    if (watchlist.some((item) => item.id === id)) {
      updatedWatchlist = watchlist.filter((item) => item.id !== id);
    } else {
      updatedWatchlist = [...watchlist, { id, title: movie.Title, poster: movie.Poster }];
    }
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const isMovieInWatchlist = watchlist.some((item) => item.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-16">
      {movie ? (
        <>
          {/* Movie Hero Section */}
          <div className="relative h-96 md:h-[500px]">
            {/* Movie Backdrop */}
            <div className="absolute inset-0 bg-black">
              {/* Use movie backdrop if available, otherwise use poster */}
              <img
                src={movie.Poster}
                alt={`${movie.Title} backdrop`}
                onError={(e) => (e.target.src = "/fallback-poster.jpg")}
                className="w-full h-full object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            </div>

            {/* Movie Info */}
            <div className="container mx-auto px-4 md:px-6 relative h-full text-center">
              <div className="flex flex-col md:flex-row items-end md:items-end absolute bottom-0 left-0 right-0 p-6 text-center">
                {/* Movie Poster */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hidden md:block w-48 lg:w-64 rounded-lg overflow-hidden shadow-2xl mr-8 ml-30 "
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={(e) => (e.target.src = "/public/No_Image.png")}
                    className="w-full h-auto"
                  />

                </motion.div>

                {/* Movie Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1"
                >
                  <h1 className="text-3xl md:text-5xl font-bold mb-2 text-left">{movie.Title}</h1>
                  <div className="flex flex-wrap items-center text-sm text-gray-300 mb-4">
                    <span className="mr-3">{movie.Year}</span>
                    <span className="mr-3">|</span>
                    <span className="mr-3">{movie.Rated}</span>
                    <span className="mr-3">|</span>
                    <span>{movie.Runtime}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold mr-3 text-center">
                      IMDb {movie.imdbRating}
                    </div>
                    <button
                      onClick={handleWatchlistToggle}
                      className={`flex items-center px-4 py-1 rounded-full border transition-colors ${isMovieInWatchlist
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "border-gray-500 text-white hover:border-yellow-400"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill={isMovieInWatchlist ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      {isMovieInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                    </button>
                  </div>
                  <p className="text-gray-300 mb-4 max-w-3xl">{movie.Plot}</p>
                  <div className="text-sm">
                    <p className="mb-1 text-left" ><span className="text-gray-400">Director:</span> {movie.Director}</p>
                    <p className="mb-1 text-left"><span className="text-gray-400">Writers:</span> {movie.Writer}</p>
                    <p className="mb-1 text-left"><span className="text-gray-400">Stars:</span> {movie.Actors}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content - Left 2/3 */}
            <div className="md:col-span-2 space-y-12">
              {/* Trailer Section */}
              {trailerUrl && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    Trailer
                  </h2>
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg ml-25">
                    <iframe
                      width="80%"
                      height="80%"
                      src={trailerUrl}
                      title={`${movie.Title} Trailer`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-95% h-95%"
                    ></iframe>
                  </div>
                </section>
              )}

              {/* User Reviews Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 text-center ml-160">
                  User Reviews
                </h2>

                {/* Review Form */}
                <div className="bg-gray-800 rounded-lg w-full p-6 mb-8 ml-70">
                  <h3 className="text-xl font-semibold mb-4 ml-20">Add Your Review</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Your Rating</label>
                      <div className="flex">
                        {[...Array(10)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <span
                              key={index}
                              className={`cursor-pointer text-2xl ${starValue <= (hoverRating || selectedRating)
                                ? "text-yellow-400"
                                : "text-gray-500"
                                }`}
                              onClick={() => handleStarClick(starValue)}
                              onMouseEnter={() => setHoverRating(starValue)}
                              onMouseLeave={() => setHoverRating(0)}
                            >
                              ★
                            </span>
                          );
                        })}
                        <span className="ml-2 text-gray-300">
                          {selectedRating > 0 ? `${selectedRating}/10` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Your Review</label>
                      <textarea
                        value={sanitizeInput(userReview)}
                        onChange={(e) => setUserReview(e.target.value)}
                        placeholder="Write your thoughts about the movie..."
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Review List */}
                {reviews.length > 0 ? (
                  <div className="space-y-4 ml-70 w-full">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-2">
                          <div className="text-yellow-400 text-lg mr-2">
                            {"★".repeat(review.rating)}
                            <span className="text-gray-600">{"★".repeat(10 - review.rating)}</span>
                          </div>
                          <span className="text-sm text-gray-400">{review.rating}/10</span>
                        </div>
                        <p className="text-gray-100 mb-2">{review.text}</p>
                        <p className="text-xs text-gray-500 text-right">{review.date}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No reviews yet. Be the first to share your thoughts!
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="space-y-8">
              {/* Movie Info */}
              <section className="bg-gray-800/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Movie Details</h3>
                <div className="space-y-3 text-sm">
                  <p><span className="text-gray-400">Released:</span> {movie.Released}</p>
                  <p><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
                  <p><span className="text-gray-400">Rated:</span> {movie.Rated}</p>
                  <p><span className="text-gray-400">Runtime:</span> {movie.Runtime}</p>
                  <p><span className="text-gray-400">Director:</span> {movie.Director}</p>
                  <p><span className="text-gray-400">Box Office:</span> {movie.BoxOffice || "N/A"}</p>
                  <p><span className="text-gray-400">Production:</span> {movie.Production || "N/A"}</p>
                </div>
              </section>

              {/* Ratings */}
              <section className="bg-gray-800/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Ratings</h3>
                <div className="space-y-4">
                  {movie.Ratings && movie.Ratings.map((rating, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300">{rating.Source}</span>
                      <span className="font-semibold">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl text-gray-400">Movie not found</p>
        </div>
      )}
    </div>
  );
}