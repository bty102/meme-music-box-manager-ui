import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyInfoApi, loginApi, logoutApi } from "../services/authApi";

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

export const logout = createAsyncThunk(
    "auth/logout",

    async (_, thunkAPI) => {

        try {

            const state =
                thunkAPI.getState();

            const accessToken =
                state.auth.accessToken;

            if (accessToken) {

                await logoutApi(
                    accessToken
                );
            }

            localStorage.removeItem(
                "accessToken"
            );

            return null;

        } catch (error) {

            localStorage.removeItem(
                "accessToken"
            );

            return null;
        }
    }
);