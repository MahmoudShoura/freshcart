import { cartReducer, CartState } from "@/features/cart/store/cart.slice";
import { authReducer, AuthState } from "@/store/auth.slice";
import wishlistReducer from "@/features/wishlist/store/wishlist.slice";
import { WishlistProduct } from "@/features/wishlist/types/wishlist.types";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export type PreloadedState = {
  auth: AuthState;
  cart: CartState;
  wishlist: { products: WishlistProduct[]; wishlistIds: string[] };
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },

    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
