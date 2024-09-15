// Creating store here for the redux
import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import { userReducer } from "./Reducer/userReducer";
import { productReducer } from "./Reducer/productsReducer";
import { cartReducer } from "./Reducer/cartReducer";
import { orderReducer } from "./Reducer/OrderReducer";

export const store = configureStore({
    reducer: {
        userReducer,
        productReducer,
        cartReducer,
        orderReducer
    }
});

