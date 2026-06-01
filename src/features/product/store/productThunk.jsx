import {
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getProductsApi,
    searchProductsApi,
} from "../services/productApi";

export const fetchProducts =
    createAsyncThunk(
        "product/fetchProducts",

        async (
            {
                isActive,
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getProductsApi({
                    isActive,
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

export const searchProducts =
    createAsyncThunk(
        "product/searchProducts",

        async (
            {
                q,
                isActive,
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await searchProductsApi({
                    q,
                    isActive,
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