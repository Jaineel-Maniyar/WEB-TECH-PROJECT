import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import Login from './components/Login';
import Signup from './components/Signup';

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
        <Route path="/sign-in" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}