import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
// import SignUp from './components/SignUp'; // Import SignUp component

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        {/* <Route path="/signup" element={<SignUp />} /> SignUp route */}
        <Route path="/search/:query" element={<MovieList />} />
        <Route path="/category/:category" element={<MovieList />} />
        <Route path="/trending" element={<MovieList />} />
        <Route path="/tv" element={<MovieList />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
