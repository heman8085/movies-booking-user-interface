import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";
import bookingsReducer from "./features/bookingsSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    bookings: bookingsReducer,
  },
});

export default store;
