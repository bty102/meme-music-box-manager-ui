import {
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getPointDiscountsApi,
} from "../services/pointDiscountApi";

export const fetchPointDiscounts =
    createAsyncThunk(
        "pointDiscount/fetchPointDiscounts",

        async (
            _,
            thunkAPI
        ) => {

            try {

                return await getPointDiscountsApi();

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response
                        ?.data
                        ?.message ||
                    "Lấy danh sách ưu đãi thất bại"
                );
            }
        }
    );
