import React from "react";
import MovieList from "../components/MoviesList"

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
      <MovieList />
    </div>
  );
};

export default Home;
