"use client";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addGuestCartItem } from "../store/cart.slice";

export function useAddToCart() {
  const dispatch = useDispatch();

  //   const handleAddToCart = async (productId: string) => {
  //     try {
  //       const response = await addProductToCart({
  //         productId,
  //       });

  //       if (response.status === "success") {
  //         toast.success(response.message);

  //         const cartInfo = await getLoggedUserCart();

  //         dispatch(setCartInfo(cartInfo));

  //         return;
  //       }
  //     } catch {
  //       dispatch(addGuestCartItem({ productId }));

  //       toast.success("Product added to cart");
  //     }
  //   };

  const handleAddToCart = async (productId: string) => {
    console.log("clicked add to cart", productId);

    dispatch(addGuestCartItem({ productId }));

    toast.success("Product added to cart");
  };
  return {
    handleAddToCart,
  };
}
