import React from "react";
import { useSelector } from "react-redux";

const BookingConfirmation = () => {
  const bookings = useSelector((state) => state.bookings.bookings);
  const lastBooking = bookings[bookings.length - 1];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmation</h1>
      {lastBooking && (
        <div className="border p-4 rounded">
          <p>
            <strong>Name:</strong> {lastBooking.name}
          </p>
          <p>
            <strong>Email:</strong> {lastBooking.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {lastBooking.phone}
          </p>
          <p>
            <strong>Movie Name:</strong> {lastBooking.movieName}
          </p>
          <p>
            <strong>Showtime:</strong> {lastBooking.showtime}
          </p>
        </div>
      )}
      {!lastBooking && <p>No recent bookings found.</p>}
    </div>
  );
};

export default BookingConfirmation;
