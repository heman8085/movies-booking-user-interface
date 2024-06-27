import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (booking, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), booking);
      return { id: docRef.id, ...booking };
    } catch (error) {
      console.error("Error adding booking: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      let bookings = [];
      snapshot.forEach((doc) => bookings.push({ id: doc.id, ...doc.data() }));
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings: ", error);
      return rejectWithValue(error.message);
    }
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
      .addCase(addBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
