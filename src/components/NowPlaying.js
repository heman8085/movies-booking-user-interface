import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className=" h-96 object-cover rounded"
            />
            <div className="text-center mt-2">
              <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
