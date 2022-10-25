import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice";
import productsSlice from "./slices/products.slice";

export default configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});
