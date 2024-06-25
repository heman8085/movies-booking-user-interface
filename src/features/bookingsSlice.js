import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (booking) => {
    const docRef = await addDoc(collection(db, "bookings"), booking);
    return { id: docRef.id, ...booking };
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addBooking.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default bookingsSlice.reducer;
