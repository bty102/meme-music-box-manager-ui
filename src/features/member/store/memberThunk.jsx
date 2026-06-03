import { createAsyncThunk }
from "@reduxjs/toolkit";

import {
    getMembersApi
} from "../services/memberApi";

export const fetchMembers =
    createAsyncThunk(
        "member/fetchMembers",

        async (
            {
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getMembersApi({
                    pageNumber,
                    pageSize,
                });

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );