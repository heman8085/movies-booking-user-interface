import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prime Movies</h1>
        <div>
          <Link to="/" className="ml-4">
            Home
          </Link>
          <Link to="/movies" className="ml-4">
            Movies
          </Link>
          <Link to="/showTime" className="ml-4">
            ShowTime
          </Link>
          <Link to="/bookedMovies" className="ml-4">
            My Bookings
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
