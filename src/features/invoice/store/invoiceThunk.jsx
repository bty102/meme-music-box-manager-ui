import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getInvoicesApi,
    getInvoicesCreatedByApi,
} from "../services/invoiceApi";

export const fetchInvoices =
    createAsyncThunk(
        "invoice/fetchInvoices",

        async (
            {
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getInvoicesApi({
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

export const fetchInvoicesCreatedBy =
    createAsyncThunk(
        "invoice/fetchInvoicesCreatedBy",

        async (
            {
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getInvoicesCreatedByApi({
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