import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" &&
        movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded">
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-full h-64 object-cover rounded"
             
            />
            <h2 className="text-xl font-bold mt-2">{movie.name}</h2>
            <Link to={`/movie/${movie.id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      {status === "failed" && <p>Failed to load movies</p>}
    </div>
  );
};

export default MovieList;
