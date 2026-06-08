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

function getGuestCartTotals(guestCart: GuestCartItem[]) {
  return guestCart.reduce(
    (totals, item) => ({
      numberOfCartItems: totals.numberOfCartItems + item.quantity,
      totalCartPrice: totals.totalCartPrice + (item.price || 0) * item.quantity,
    }),
    {
      numberOfCartItems: 0,
      totalCartPrice: 0,
    },
  );
}

const initialState: CartState = {
  numberOfCartItems: getGuestCartTotals(guestCartFromStorage).numberOfCartItems,
  cartId: null,
  products: [],
  guestCart: guestCartFromStorage,
  totalCartPrice: getGuestCartTotals(guestCartFromStorage).totalCartPrice,
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

    addGuestCartItem(
      state,
      action: PayloadAction<{
        productId: string;
        quantity?: number;
        title?: string;
        imageCover?: string;
        price?: number;
        category?: {
          name: string;
        };
      }>,
    ) {
      const payload = action.payload;
      const quantity = Math.max(1, payload.quantity || 1);

      const existingItem = state.guestCart.find(
        (item) => item.productId === payload.productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.guestCart.push({
          productId: payload.productId,
          quantity,
          title: payload.title,
          imageCover: payload.imageCover,
          price: payload.price,
          category: payload.category,
        });
      }

      saveCartToStorage(state.guestCart);

      const totals = getGuestCartTotals(state.guestCart);
      state.numberOfCartItems = totals.numberOfCartItems;
      state.totalCartPrice = totals.totalCartPrice;
    },

    hydrateGuestCart(state, action: PayloadAction<GuestCartItem[]>) {
      state.guestCart = action.payload;
      const totals = getGuestCartTotals(state.guestCart);
      state.numberOfCartItems = totals.numberOfCartItems;
      state.totalCartPrice = totals.totalCartPrice;
    },

    updateGuestCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const item = state.guestCart.find(
        (cartItem) => cartItem.productId === action.payload.productId,
      );

      if (!item) return;

      item.quantity = Math.max(1, action.payload.quantity);

      saveCartToStorage(state.guestCart);

      const totals = getGuestCartTotals(state.guestCart);
      state.numberOfCartItems = totals.numberOfCartItems;
      state.totalCartPrice = totals.totalCartPrice;
    },

    removeGuestCartItem(state, action: PayloadAction<{ productId: string }>) {
      state.guestCart = state.guestCart.filter(
        (item) => item.productId !== action.payload.productId,
      );

      saveCartToStorage(state.guestCart);

      const totals = getGuestCartTotals(state.guestCart);
      state.numberOfCartItems = totals.numberOfCartItems;
      state.totalCartPrice = totals.totalCartPrice;
    },
    clearGuestCart(state) {
      state.guestCart = [];
      state.numberOfCartItems = 0;
      state.totalCartPrice = 0;
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
  hydrateGuestCart,
  updateGuestCartItemQuantity,
  removeGuestCartItem,
  clearGuestCart,
} = cartSlice.actions;
