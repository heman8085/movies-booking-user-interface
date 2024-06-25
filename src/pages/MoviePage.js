import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MoviesDetails"
import BookingForm from "../components/BookingForm";

const MoviePage = () => {
  const { id } = useParams();
  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.id === id)
  );

  return (
    <div className="container mx-auto p-4">
      {movie && (
        <>
          <MovieDetails movie={movie} />
          <BookingForm movie={movie} />
        </>
      )}
      {!movie && <p>Loading...</p>}
    </div>
  );
};

export default MoviePage;
