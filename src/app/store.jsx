import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/store/authSlice";

import areaReducer from "../features/area/store/areaSlice";
import roomReducer from "../features/room/store/roomSlice";
import invoiceReducer from "../features/invoice/store/invoiceSlice";
import productReducer from "../features/product/store/productSlice";
import pointDiscountReducer from "../features/pointDiscount/store/pointDiscountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    area: areaReducer,
    room: roomReducer,
    invoice: invoiceReducer,
    product: productReducer,
    pointDiscount: pointDiscountReducer,
  },
});
