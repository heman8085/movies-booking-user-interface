import React from "react";
import { Link } from "react-router-dom";


const MovieDetails = ({ movie }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={movie.posterUrl}
          alt={movie.name}
          className="w-full md:w-1/2 h-auto rounded"
        />
        <div className="md:ml-4">
          <h1 className="text-3xl font-bold">{movie.name}</h1>
          <p className="mt-2">{movie.description}</p>
          <p className="mt-2">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="mt-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mt-2">
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p className="mt-2">
            <strong>Language:</strong> {movie.language}
          </p>
          <p className="mt-2">
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <a
            href={movie.trailerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500"
          >
            Watch Trailer
          </a>
          <p className="mt-2">
            <Link to={`/showTime/${movie.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Checkout the Showtime
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
