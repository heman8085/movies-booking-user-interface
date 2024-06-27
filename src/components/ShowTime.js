import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import { fetchShowtimes } from "../features/showtimesSlice";
import { Link } from "react-router-dom";

const ShowTime = () => {
  const dispatch = useDispatch();

  const { movies, status: moviesStatus } = useSelector((state) => state.movies);
  const { showtimes, status: showtimesStatus } = useSelector(
    (state) => state.showtimes
  );

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShowtimes());
  }, [dispatch]);

  if (moviesStatus === "loading" || showtimesStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (
    moviesStatus === "failed" ||
    !movies.length ||
    showtimesStatus === "failed"
  ) {
    return <p>Failed to load movie details or showtimes.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex mb-8">
          <img
            src={movie.posterUrl}
            alt={movie.name}
            className="w-64 h-auto object-cover rounded-lg mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{movie.name}</h2>
            <p className="text-lg text-gray-600">
              Directed by {movie.director}
            </p>
            <p className="mt-2">{movie.description}</p>
            <h3 className="text-xl font-bold mb-2 mt-4">Showtimes:</h3>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Theater</th>
                  <th className="border border-gray-300 p-2">Showtime</th>
                  <th className="border border-gray-300 p-2">Ticket</th>
                </tr>
              </thead>
              <tbody>
                {showtimes
                  .filter((showtime) => showtime.movieId === movie.id)
                  .map((showtime) => (
                    <tr key={showtime.id} className="bg-white">
                      <td className="border border-gray-300 p-2">
                        {showtime.theater}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {showtime.showtime}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Link to={`/bookingForm/${movie.id}/${showtime.id}`}>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Book Now
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                {showtimes.filter((showtime) => showtime.movieId === movie.id)
                  .length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-2">
                      No showtimes available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTime;
