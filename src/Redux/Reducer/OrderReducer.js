// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../Database/firebaseConfig";

// Creating all the async thunks here for asynchronous functions
// Fetching user orders here using async Thunk
export const fetchOrders = createAsyncThunk(
  "orders/fetchData",
  async (signedUser, { dispatch }) => {
    try {
      const orderQuery = query(
        collection(db, "orders"),
        where("user", "==", signedUser)
      );
      onSnapshot(orderQuery, (snapShot) => {
        const orderData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setOrders(orderData)); // Dispatch an action to set the orders
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
);

// Function to create order here
export const handleOrder = createAsyncThunk(
  "orders/create",
  async ({ signedUser, cartItems, total }) => {
    try {
      await addDoc(collection(db, "orders"), {
        cartItems: cartItems,
        total: total,
        user: signedUser,
        createdAt: new Date().toUTCString(),
      });
      // Remove items from the cart after a successful order
      const cartQuery = query(
        collection(db, "cart"),
        where("user", "==", signedUser)
      );
      const cartSnapshot = await getDocs(cartQuery);

      // Delete each item in the cart
      cartSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      toast.success("Order created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
);

// State
const INITIAL_STATE = {
  orders: [],
  orderLoading: true,
};

// Creating slice
export const orderSlice = createSlice({
  name: "Order",
  initialState: INITIAL_STATE,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.orderLoading = false;
    },
  },
});

// Extracting reducer
export const orderReducer = orderSlice.reducer;

// Extracting actions
export const { setOrders } = orderSlice.actions;

// Extracting state
export const orderSelector = (state) => state.orderReducer;
