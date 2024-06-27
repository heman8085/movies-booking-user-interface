import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";
import bookingsReducer from "./features/bookingsSlice";
import showtimesReducer from "./features/showtimesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    bookings: bookingsReducer,
    showtimes: showtimesReducer,
  },
});

export default store;
