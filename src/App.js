import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MovieList from "./components/MoviesList";
import ShowTime from "./components/ShowTime";
import BookedMovies from "./pages/BookedMovies";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/showTime" element={<ShowTime />} />
            <Route path="/showTime/:movieId" element={<ShowTime />} />
            <Route
              path="/bookingForm/:movieId/:showtimeId"
              element={<BookingForm />}
            />
            <Route path="/bookedMovies" element={<BookedMovies />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
