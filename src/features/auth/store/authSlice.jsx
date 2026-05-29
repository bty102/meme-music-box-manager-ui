import { createSlice } from "@reduxjs/toolkit";
import { fetchMyInfo, login, logout } from "./authThunk";

const initialState = {

    accessToken:
        localStorage.getItem("accessToken"),

    user: null,

    loading: false,

    error: null
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        // logout: (state) => {

        //     state.accessToken = null;

        //     state.user = null;

        //     localStorage.removeItem(
        //         "accessToken"
        //     );
        // }
    },

    extraReducers: (builder) => {

        builder

            // LOGIN

            .addCase(login.pending, (state) => {

                state.loading = true;

                state.error = null;
            })

            .addCase(login.fulfilled,
                (state, action) => {

                state.loading = false;

                state.accessToken =
                    action.payload;
            })

            .addCase(login.rejected,
                (state, action) => {

                state.loading = false;

                state.error = action.payload;
            })


            // FETCH MY INFO

            .addCase(fetchMyInfo.pending,
                (state) => {

                state.loading = true;
            })

            .addCase(fetchMyInfo.fulfilled,
                (state, action) => {

                state.loading = false;

                state.user = action.payload;
            })

            .addCase(fetchMyInfo.rejected,
                (state, action) => {

                state.loading = false;

                state.error = action.payload;
            })
            .addCase(
                logout.fulfilled,
                (state) => {

                    state.accessToken = null;

                    state.user = null;

                    state.error = null;
                }
            )
            .addCase(
                logout.rejected,
                (state) => {

                    state.accessToken = null;

                    state.user = null;
                }
            );
    }
});

// export const { logout } =
//     authSlice.actions;

export default authSlice.reducer;