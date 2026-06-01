"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "react-toastify";

import { addProductToCart, getLoggedUserCart } from "../server/cart.actions";

import { addGuestCartItem, setCartInfo } from "../store/cart.slice";

import { Product } from "@/features/products/types/Products.types";

export function useAddToCart() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated) {
      dispatch(
        addGuestCartItem({
          productId: product.id,
          title: product.title,
          imageCover: product.imageCover,
          price: product.priceAfterDiscount || product.price,
          category: product.category.name,
        }),
      );

      toast.success("Product added to cart");
      return;
    }

    try {
      await addProductToCart({
        productId: product.id,
      });

      const cartInfo = await getLoggedUserCart();

      dispatch(setCartInfo(cartInfo));

      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product");
    }
  };

  return {
    handleAddToCart,
  };
}
