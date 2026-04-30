import { CartResponse } from "./../types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.types";
import { removeProductFromCart } from "../server/cart.actions";

export interface CartState {
  numberOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numberOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: function (state, action: PayloadAction<CartResponse>) {
      state.cartId = action.payload.cartId;
      state.numberOfCartItems = action.payload.numOfCartItems;
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    },

    removeProduct: function (state, action: PayloadAction<{ id: string }>) {
      const productId = action.payload.id;
      const removeProduct = state.products.find(
        (item) => item.product.id === productId,
      );

      if (removeProduct) {
        state.products = state.products.filter(
          (product) => product.product.id !== productId,
        );
        state.numberOfCartItems = state.products.length;
        state.totalCartPrice -= removeProduct.price * removeProduct.count;
      }
    },

    clearCart: function (state) {
      state.cartId = null;
      state.numberOfCartItems = 0;
      state.products = [];
      state.totalCartPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartInfo, removeProduct, clearCart } = cartSlice.actions;
