import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";

const ShowTime = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "failed" || !movies.length) {
    return <p>Failed to load movie details.</p>;
  }

  return (
    <div className="container mx-auto p-4">
          {status === "succeeded" &&
              movies.map((movie) => (
        <div key={movie.id} className="mb-8">
          <div className="flex items-center justify-center">
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-64 h-auto object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{movie.name}</h2>
            <p className="text-lg text-gray-600">
              Directed by {movie.director}
            </p>
            <p className="mt-2">{movie.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Showtimes:</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Theater</th>
                  <th className="border border-gray-300 p-2">Showtime</th>
                  <th className="border border-gray-300 p-2">Book Ticket</th>
                </tr>
              </thead>
              {/* <tbody>
                {movies.showtimes.map((showtime) => (
                  <tr key={showtime.id} className="bg-white">
                    <td className="border border-gray-300 p-2">
                      {showtime.theater}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showtime.time}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTime;
