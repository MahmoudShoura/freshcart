"use client";

import { createStore, PreloadedState } from "@/store/store";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

type ProviderProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export default function Providers({ children, preloadedState }: ProviderProps) {
  const [store] = useState(() => createStore(preloadedState));

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
