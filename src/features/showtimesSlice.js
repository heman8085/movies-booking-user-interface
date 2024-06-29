
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection,getDocs} from "firebase/firestore";

export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetchShowtimes",
  async () => {
    const snapshot = await getDocs(collection(db, "showtimes"));
    let showtimes = [];
    snapshot.forEach((doc) => {
      showtimes.push({ id: doc.id, ...doc.data() });
    });
    return showtimes;
  }
);

const showtimesSlice = createSlice({
  name: "showtimes",
  initialState: { showtimes: [], status: null },
  reducers: {
    addShowtime: (state, action) => {
      state.showtimes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.showtimes = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchShowtimes.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addShowtime } = showtimesSlice.actions;

export default showtimesSlice.reducer;
