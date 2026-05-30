import { createSlice } from "@reduxjs/toolkit";
import { fetchRooms, searchRooms } from "./roomThunk";

const initialState = {
  rooms: [],

  areaId: null,

  searchKeyword: "",

  pageNumber: 0,
  pageSize: 5,
  totalPages: 0,
  totalElements: 0,

  mode: "LIST", // LIST | SEARCH

  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",

  initialState,

  reducers: {
    clearRooms(state) {
      state.rooms = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;

        state.rooms = action.payload.content;

        state.pageNumber = action.payload.page.number;

        state.pageSize = action.payload.page.size;

        state.totalPages = action.payload.page.totalPages;

        state.totalElements = action.payload.page.totalElements;

        state.areaId = action.meta.arg.areaId;
        state.mode = "LIST";
      })

      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(searchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchRooms.fulfilled, (state, action) => {
        state.loading = false;

        state.rooms = action.payload.content;

        state.pageNumber = action.payload.page.number;

        state.pageSize = action.payload.page.size;

        state.totalPages = action.payload.page.totalPages;

        state.totalElements = action.payload.page.totalElements;

        state.searchKeyword = action.meta.arg.q;
        state.mode = "SEARCH";
      })

      .addCase(searchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRooms } = roomSlice.actions;

export default roomSlice.reducer;
