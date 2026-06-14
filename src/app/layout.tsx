import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "react-toastify/dist/ReactToastify.css";
import "../lib/fontawsome";
import { Exo } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { verifytoken } from "@/features/auth/server/auth.actions";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import { CartState } from "@/features/cart/store/cart.slice";
import { getWishlist } from "@/features/wishlist/server/wishlist.actions";
import { WishlistProduct } from "@/features/wishlist/types/wishlist.types";
import { LanguageProvider } from "@/context/language.context";
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

const defaultCartState: CartState = {
  cartId: null,
  numberOfCartItems: 0,
  totalCartPrice: 0,
  products: [],
  guestCart: [],
  error: null,
  isLoading: false,
};

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Fresh groceries delivered to your doorstep.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authValues = await verifytoken();

  let cartState = defaultCartState;
  let wishlistState: { products: WishlistProduct[]; wishlistIds: string[] } = {
    products: [],
    wishlistIds: [],
  };

  if (authValues.isAuthenticated) {
    try {
      const [CartResponse, wishlistResponse] = await Promise.all([
        getLoggedUserCart(),
        getWishlist(),
      ]);

      const totalCartItems = CartResponse.data.products.reduce(
        (total, item) => total + item.count,
        0,
      );

      cartState = {
        cartId: CartResponse.cartId,
        totalCartPrice: CartResponse.data.totalCartPrice,
        products: CartResponse.data.products,
        numberOfCartItems: totalCartItems,
        guestCart: [],
        isLoading: false,
        error: null,
      };

      wishlistState = {
        products: wishlistResponse,
        wishlistIds: wishlistResponse.map((p: WishlistProduct) => p._id),
      };
    } catch (error) {
      cartState = defaultCartState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.className} font-medium `}>
        <Providers
          preloadedState={{
            auth: authValues,
            cart: cartState,
            wishlist: wishlistState,
          }}
        >
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
