import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TVShowList = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?s=game&type=series&apikey=66e09c1f`
      );
      const data = await res.json();
      setTVShows(data.Search || []);
    };

    fetchTVShows();
  }, []);

  return (
    <div className="min-w-screen min-h-screen p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tvShows.map((show) => (
        <Link key={show.imdbID} to={`/movie/${show.imdbID}`}>
          <div className="bg-black border-white-2px shadow rounded-2xl overflow-hidden hover:scale-105 transition">
            <img src={show.Poster} alt={show.Title} className="w-full h-72 object-cover" />
            <div className="p-2">
              <h3 className="font-bold text-lg">{show.Title}</h3>
              <p className="text-sm text-gray-600">{show.Year}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TVShowList;
