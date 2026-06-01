import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    fetchPointDiscounts,
} from "./pointDiscountThunk";

const initialState = {
    pointDiscounts: [],
    loading: false,
    error: null,
};

const pointDiscountSlice =
    createSlice({

        name: "pointDiscount",

        initialState,

        reducers: {},

        extraReducers:
            (builder) => {

                builder

                    .addCase(
                        fetchPointDiscounts.pending,

                        (state) => {

                            state.loading =
                                true;

                            state.error =
                                null;
                        }
                    )

                    .addCase(
                        fetchPointDiscounts.fulfilled,

                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.pointDiscounts =
                                action.payload;
                        }
                    )

                    .addCase(
                        fetchPointDiscounts.rejected,

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
    pointDiscountSlice.reducer;
