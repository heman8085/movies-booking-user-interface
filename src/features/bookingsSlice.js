import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (booking) => {
    const docRef = await addDoc(collection(db, "bookings"), booking);
    return { id: docRef.id, ...booking };
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const snapshot = await getDocs(collection(db, "bookings"));
    let bookings = [];
    snapshot.forEach((doc) => bookings.push({ id: doc.id, ...doc.data() }));
    return bookings;
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
      })
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default bookingsSlice.reducer;
