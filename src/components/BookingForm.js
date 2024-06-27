import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../features/bookingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovies } from "../features/moviesSlice";
import { fetchShowtimes } from "../features/showtimesSlice";

const BookingForm = () => {
  const { movieId, showtimeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, status: moviesStatus } = useSelector((state) => state.movies);
  const { showtimes, status: showtimesStatus } = useSelector(
    (state) => state.showtimes
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState("");

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShowtimes());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    const selectedShowtime = showtimes.find(
      (showtime) => showtime.id === showtimeId
    );

    const result = await dispatch(
      addBooking({
        name,
        email,
        phone,
        tickets,
        movieName: selectedMovie.name,
        showtime: selectedShowtime.showtime,
        theaterName: selectedShowtime.theater,
      })
    );

    if (addBooking.fulfilled.match(result)) {
      navigate("/booking-confirmation");
    } else {
      console.error("Failed to book the ticket: ", result.payload);
    }
  };

  if (moviesStatus === "loading" || showtimesStatus === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        value={tickets}
        onChange={(e) => setTickets(e.target.value)}
        placeholder="Number of tickets"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Book Ticket
      </button>
    </form>
  );
};

export default BookingForm;
