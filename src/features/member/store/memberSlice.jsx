import {
    createSlice
} from "@reduxjs/toolkit";

import {
    fetchMembers
} from "./memberThunk";

const initialState = {

    members: [],

    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,

    loading: false,
    error: null,
};

const memberSlice =
    createSlice({

        name: "member",

        initialState,

        reducers: {},

        extraReducers: builder => {

            builder

                .addCase(
                    fetchMembers.pending,
                    state => {

                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchMembers.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.members =
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
                    fetchMembers.rejected,
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
memberSlice.reducer;