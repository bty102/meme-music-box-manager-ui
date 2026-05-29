import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAreasApi } from "../services/areaApi";

export const fetchAreas = createAsyncThunk(
    "area/fetchAreas",
    async (isActive, thunkAPI) => {
        try {
            const response = await getAreasApi(isActive);

            return response.result;
        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Lấy danh sách khu vực thất bại"
            );
        }
    }
);