// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Creating all the async thunks here for asynchronous functions
export const fetchDataAsync = createAsyncThunk(
  "products/fetchData",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      // Converting the prices in the Dollar to Rupees
      const productsWithINRPrice = data.map((product) => ({
        ...product,
        price: Math.round(product.price * 80), // Assuming 1 USD = 74.5 INR
      }));

      return productsWithINRPrice;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);

// States
const INITIAL_STATE = {
  products: [],
  filteredProducts: [],
  isFiltered: false,
  searchValue: "",
  selectedPrice: 0,
  selectedCategories: [],
  productLoading: true,
};

// Creating slice for the productsReducer
export const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    handleSearchProductByName: (state, action) => {
      state.searchValue = action.payload.toLowerCase();
    },
    handlePriceChange: (state, action) => {
      state.selectedPrice = action.payload;
    },
    handleCategoryChange: (state, action) => {
      const selectedCategory = action.payload;
      if (state.selectedCategories.includes(selectedCategory)) {
        // Remove the selected category
        const updatedCategories = state.selectedCategories.filter(
          (category) => category !== selectedCategory
        );
        state.selectedCategories = updatedCategories;
      } else {
        state.selectedCategories = [
          ...state.selectedCategories,
          selectedCategory,
        ];
      }
    },
    filterProducts: (state, action) => {
      // Setting isFiltered state to true
      state.isFiltered = true;
      let filteredProducts = state.products;

      // If both price and categories selected
      if (state.selectedPrice > 0 && state.selectedCategories.length > 0) {
        filteredProducts = state.products.filter(
          (product) =>
            product.price <= state.selectedPrice &&
            state.selectedCategories.includes(product.category)
        );
      } else if (state.searchValue) {
        filteredProducts = state.products.filter((product) =>
          product.title.toLowerCase().includes(state.searchValue)
        );
      } else if (state.selectedPrice > 0) {
        filteredProducts = state.products.filter(
          (product) => product.price <= state.selectedPrice
        );
      } else if (state.selectedCategories.length > 0) {
        filteredProducts = state.products.filter((product) =>
          state.selectedCategories.includes(product.category)
        );
      }
      // If price and categories both deselected then setting isFiltered false
      else if (
        !state.searchValue &&
        state.selectedPrice === 0 &&
        state.selectedCategories.length === 0
      ) {
        state.isFiltered = false;
      }
      // Setting the state for filtered products
      state.filteredProducts = filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAsync.fulfilled, (state, action) => {
      // Setting data
      state.products = action.payload;
      // Setting loading
      state.productLoading = false;
    });
  },
});

// Extracting the reducer from slice
export const productReducer = productsSlice.reducer;

// Extracting actions here from product slice
export const {
  handleSearchProductByName,
  handlePriceChange,
  handleCategoryChange,
  filterProducts,
} = productsSlice.actions;

// Creating products selector to access all states
export const productsSelector = (state) => state.productReducer;
