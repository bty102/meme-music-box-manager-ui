import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    fetchProducts,
    searchProducts,
} from "./productThunk";

const initialState = {

    products: [],

    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,

    searchKeyword: "",

    mode: "LIST",

    loading: false,
    error: null,
};

const productSlice =
    createSlice({

        name: "product",

        initialState,

        reducers: {

            setSearchKeyword:
                (
                    state,
                    action
                ) => {

                    state.searchKeyword =
                        action.payload;
                },

            setMode:
                (
                    state,
                    action
                ) => {

                    state.mode =
                        action.payload;
                },
        },

        extraReducers:
            (builder) => {

                builder

                    .addCase(
                        fetchProducts.pending,
                        (state) => {

                            state.loading =
                                true;

                            state.error =
                                null;
                        }
                    )

                    .addCase(
                        fetchProducts.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.products =
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
                        fetchProducts.rejected,
                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.error =
                                action.payload;
                        }
                    )

                    .addCase(
                        searchProducts.pending,
                        (state) => {

                            state.loading =
                                true;

                            state.error =
                                null;
                        }
                    )

                    .addCase(
                        searchProducts.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.products =
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
                        searchProducts.rejected,
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

export const {
    setSearchKeyword,
    setMode,
} = productSlice.actions;

export default productSlice.reducer;