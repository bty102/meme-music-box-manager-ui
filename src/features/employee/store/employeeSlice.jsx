import {
    createSlice,
}
from "@reduxjs/toolkit";

import {
    fetchEmployees,
}
from "./employeeThunk";

const initialState = {

    employees: [],

    pageNumber: 0,
    pageSize: 10,

    totalPages: 0,
    totalElements: 0,

    loading: false,
    error: null,
};

const employeeSlice =
    createSlice({

        name: "employee",

        initialState,

        reducers: {},

        extraReducers: builder => {

            builder

                .addCase(
                    fetchEmployees.pending,
                    state => {

                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchEmployees.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.employees =
                            action.payload.content;

                        state.pageNumber =
                            action.payload.page.number;

                        state.pageSize =
                            action.payload.page.size;

                        state.totalPages =
                            action.payload.page.totalPages;

                        state.totalElements =
                            action.payload.page.totalElements;
                    }
                )

                .addCase(
                    fetchEmployees.rejected,
                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.error =
                            action.payload;
                    }
                );
        },
    });

export default
    employeeSlice.reducer;