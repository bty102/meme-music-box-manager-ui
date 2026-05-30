import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomsApi, searchRoomsApi } from "../services/roomApi";

export const fetchRooms = createAsyncThunk(
    "room/fetchRooms",

    async (
        {
            areaId,
            isActive,
            pageNumber = 0,
            pageSize = 5,
        },
        thunkAPI
    ) => {
        try {

            const response = await getRoomsApi({
                areaId,
                isActive,
                pageNumber,
                pageSize,
            });

            return response.result;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Lấy danh sách phòng thất bại"
            );
        }
    }
);

export const searchRooms = createAsyncThunk(
    "room/searchRooms",

    async (
        {
            q,
            isActive,
            pageNumber = 0,
            pageSize = 8,
        },
        thunkAPI
    ) => {
        try {

            const response = await searchRoomsApi({
                q,
                isActive,
                pageNumber,
                pageSize,
            });

            return response.result;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Tìm kiếm phòng thất bại"
            );
        }
    }
);