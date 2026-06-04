import { createAsyncThunk }
from "@reduxjs/toolkit";

import {
    getEmployeesApi,
}
from "../services/employeeApi";

export const fetchEmployees =
    createAsyncThunk(
        "employee/fetchEmployees",

        async (
            params,
            thunkAPI
        ) => {

            try {

                return await getEmployeesApi(
                    params
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );