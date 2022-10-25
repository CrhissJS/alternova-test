import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const cart = JSON.parse(JSON.stringify(state));
      cart.push(action.payload);
      return cart;
    },
    updateProduct: (state, action) => {
      const cart = JSON.parse(JSON.stringify(state));
      const index = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      cart[index] = {
        id: cart[index].id,
        name: cart[index].name,
        price: cart[index].price,
        quantity: action.payload.quantity,
      };
      return cart;
    },
    deleteProduct: (state, action) => {
      const cart = JSON.parse(JSON.stringify(state));
      const index = cart.findIndex(
        (product) => product.id === action.payload.id
      );

      cart.splice(index, 1);
      return cart;
    },
    resetCart: () => [],
  },
});

export const { addProduct, updateProduct, deleteProduct, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
