// src/features/moviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const snapshot = await getDocs(collection(db, "movies"));
  let movies = [];
  snapshot.forEach((doc) => movies.push({ id: doc.id, ...doc.data() }));
  return movies;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default moviesSlice.reducer;
