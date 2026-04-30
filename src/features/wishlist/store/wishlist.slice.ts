import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct } from "../types/wishlist.types";

interface WishlistState {
  products: WishlistProduct[];
  wishlistIds: string[];
}

const initialState: WishlistState = {
  products: [],
  wishlistIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistProduct[]>) {
      state.products = action.payload;
      state.wishlistIds = action.payload.map((p) => p._id);
    },

    setWishlistIds(state, action: PayloadAction<string[]>) {
      state.wishlistIds = action.payload;
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.wishlistIds = state.wishlistIds.filter((id) => id !== action.payload);
    },
  },
});

export const { setWishlist, setWishlistIds, removeProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
