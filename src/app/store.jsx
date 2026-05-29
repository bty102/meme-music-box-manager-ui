import { configureStore }
from "@reduxjs/toolkit";

import authReducer
from "../features/auth/store/authSlice";

import areaReducer from "../features/area/store/areaSlice"
import roomReducer from "../features/room/store/roomSlice";

export const store = configureStore({

    reducer: {
        auth: authReducer,
        area: areaReducer,
        room: roomReducer,
    }
});