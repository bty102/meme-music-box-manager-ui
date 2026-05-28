import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyInfoApi, loginApi } from "../services/authApi";

export const login = createAsyncThunk(
    "auth/login",
    async (loginRequest, thunkAPI) => {

        try {

            const response =
                await loginApi(loginRequest);

            const accessToken =
                response.result.accessToken;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            return accessToken;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
                    || "Login failed"
            );
        }
    }
);

export const fetchMyInfo = createAsyncThunk(
    "auth/fetchMyInfo",
    async (_, thunkAPI) => {

        try {

            const response =
                await getMyInfoApi();

            return response.result;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
                    || "Fetch profile failed"
            );
        }
    }
);