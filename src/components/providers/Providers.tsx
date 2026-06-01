"use client";

import { createStore, PreloadedState } from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { getCartFromStorage } from "@/features/cart/services/cart.service";
import { addGuestCartItem } from "@/features/cart/store/cart.slice";
type ProviderProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export default function Providers({ children, preloadedState }: ProviderProps) {
  const [store] = useState(() => createStore(preloadedState));
  useEffect(() => {
    const guestCart = getCartFromStorage();

    if (guestCart.length > 0) {
      guestCart.forEach((item) => {
        store.dispatch(
          addGuestCartItem({
            productId: item.productId,
            title: item.title,
            imageCover: item.imageCover,
            price: item.price,
            category: item.category,
          }),
        );
      });
    }
  }, [store]);
  return (
    <>
      <Provider store={store}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Provider>
    </>
  );
}
