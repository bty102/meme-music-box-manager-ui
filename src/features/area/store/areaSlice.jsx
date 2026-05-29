import { createSlice } from "@reduxjs/toolkit";
import { fetchAreas } from "./areaThunk";

const initialState = {
    areas: [],
    loading: false,
    error: null,
};

const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchAreas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.loading = false;
                state.areas = action.payload;
            })

            .addCase(fetchAreas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default areaSlice.reducer;