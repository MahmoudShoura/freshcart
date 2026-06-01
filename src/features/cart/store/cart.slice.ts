import {
  getCartFromStorage,
  saveCartToStorage,
  GuestCartItem,
} from "../services/cart.service";
import { CartResponse } from "./../types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.types";
import { removeProductFromCart } from "../server/cart.actions";

export interface CartState {
  numberOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  guestCart: GuestCartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const guestCartFromStorage = getCartFromStorage();

const initialState: CartState = {
  numberOfCartItems: guestCartFromStorage.reduce(
    (total, item) => total + item.quantity,
    0,
  ),
  cartId: null,
  products: [],
  guestCart: guestCartFromStorage,
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
      state.numberOfCartItems = action.payload.data.products.reduce(
        (total, item) => total + item.count,
        0,
      );
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    },

    addGuestCartItem(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;

      if (!state.guestCart) {
        state.guestCart = [];
      }

      const existingItem = state.guestCart.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.guestCart.push({
          productId,
          quantity: 1,
        });
      }

      saveCartToStorage(state.guestCart);

      state.numberOfCartItems = state.guestCart.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },

    clearGuestCart(state) {
      state.guestCart = [];
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
        state.numberOfCartItems = state.products.reduce(
          (total, item) => total + item.count,
          0,
        );
        state.totalCartPrice -= removeProduct.price * removeProduct.count;
      }
    },

    clearCart: function (state) {
      state.cartId = null;
      state.numberOfCartItems = 0;
      state.products = [];
      state.guestCart = [];
      state.totalCartPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  setCartInfo,
  removeProduct,
  clearCart,
  addGuestCartItem,
  clearGuestCart,
} = cartSlice.actions;
