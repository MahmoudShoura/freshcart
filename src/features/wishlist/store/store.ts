import { cartReducer } from "@/features/cart/store/cart.slice";
import wishlistReducer from "@/features/wishlist/store/wishlist.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // 👈 ADD THIS
  },
});
