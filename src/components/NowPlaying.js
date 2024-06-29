
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import { Link } from "react-router-dom";

const NowPlaying = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const nowPlayingMovies = movies.filter(
    (movie) => movie.category === "Now Playing"
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load movies</p>;
  }

  if (status === "succeeded" && nowPlayingMovies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className="relative group">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="h-96 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center rounded">
                <p className="text-lg font-bold mb-2">{movie.name}</p>
                <p className="mb-2">IMDb Rating: {movie.imdbRating}</p>
                <p className="mb-2">Genre: {movie.genre}</p>
                <p>Release Date: {movie.releaseDate}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
