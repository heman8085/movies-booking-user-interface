import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../features/bookingsSlice";

const BookedMovies = () => {
  const bookings = useSelector((state) => state.bookings.bookings);
  const status = useSelector((state) => state.bookings.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load bookings</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Booked Movies</h1>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 border rounded">
            <p>
              <strong>User Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Movie Name:</strong> {booking.movieName}
            </p>
            <p>
              <strong>Showtime:</strong> {booking.showtime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedMovies;
