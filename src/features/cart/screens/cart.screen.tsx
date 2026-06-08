"use client";

import { AppState, useAppSelector } from "@/store/store";
import {
  faArrowLeft,
  faCheck,
  faMinus,
  faPlus,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeGuestCartItem,
  updateGuestCartItemQuantity,
} from "../store/cart.slice";
import { clearCartStorage } from "../services/cart.service";
import { clearLoggedUserCart } from "../server/cart.actions";
import { toast } from "react-toastify";

export default function CartScreen() {
  const { numberOfCartItems, products, guestCart, totalCartPrice } =
    useAppSelector((state) => state.cart);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const handleUpdateGuestQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    dispatch(updateGuestCartItemQuantity({ productId, quantity }));
  };

  const handleRemoveGuestItem = (productId: string) => {
    dispatch(removeGuestCartItem({ productId }));
  };

  const handleClearCart = async () => {
    try {
      if (isAuthenticated) {
        await clearLoggedUserCart();
      } else {
        clearCartStorage();
      }

      dispatch(clearCart());

      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };
  return (
    <>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* page Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-primary-600 transition">
                Home
              </Link>

              <span>/</span>
              <span className="text-gray-900">Shopping Cart</span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </span>
                  Shopping Cart
                </h1>

                <p className="text-gray-500 mt-2">
                  you have{" "}
                  <span className="font-semibold text-primary-600">
                    {numberOfCartItems}{" "}
                    {numberOfCartItems === 1 ? "item" : "items"}
                  </span>{" "}
                  in your cart
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Cart Items List */}

              <div className="space-y-4">
                {products.length > 0
                  ? products.map((product) => (
                      <CartItem key={product._id} info={product} />
                    ))
                  : guestCart.length > 0
                    ? guestCart.map((item) => (
                        <div
                          key={item.productId}
                          className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                        >
                          <div className="p-4 sm:gap-5">
                            <div className="flex gap-4 sm:gap-6">
                              <Link
                                href={`/products/${item.productId}`}
                                className="relative shrink-0 group"
                              >
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 hover:scale-110 transition-transform duration-500">
                                  {item.imageCover ? (
                                    <Image
                                      src={item.imageCover}
                                      alt={item.title || "Guest cart product"}
                                      fill
                                      sizes="112px"
                                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 text-center">
                                      No image
                                    </div>
                                  )}
                                </div>

                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-[8px]"
                                  />
                                  In Stock
                                </div>
                              </Link>

                              <div className="flex-1 min-w-0 flex flex-col">
                                <div className="mb-3">
                                  <Link
                                    href={`/products/${item.productId}`}
                                    className="group/title"
                                  >
                                    <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed">
                                      {item.title || "Product"}
                                    </h3>
                                  </Link>

                                  <div className="flex items-center gap-2 mt-2">
                                    {item.category?.name && (
                                      <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 rounded-full text-sm">
                                        {item.category.name}
                                      </span>
                                    )}
                                    {item.category?.name && (
                                      <span className="text-xs text-gray-400">
                                        .
                                      </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                      SKU: {item.productId.slice(-6).toUpperCase()}
                                    </span>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-primary-600 font-bold text-lg">
                                      {item.price || 0} EGP
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      per unit
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                  <div className="flex items-center">
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                      <button
                                        className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
                                        aria-label="Decrease quantity"
                                        disabled={item.quantity <= 1}
                                        onClick={() => {
                                          handleUpdateGuestQuantity(
                                            item.productId,
                                            item.quantity - 1,
                                          );
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faMinus}
                                          className="text-xs"
                                        />
                                      </button>

                                      <span className="w-12 text-center font-bold text-gray-900">
                                        {item.quantity}
                                      </span>

                                      <button
                                        className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 hover:text-white transition-colors duration-300"
                                        aria-label="Increase quantity"
                                        onClick={() => {
                                          handleUpdateGuestQuantity(
                                            item.productId,
                                            item.quantity + 1,
                                          );
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          className="text-xs"
                                        />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <p className="text-sm text-gray-400 mb-0.5">
                                        Total
                                      </p>
                                      <p className="text-xl font-bold text-gray-900">
                                        {(item.price || 0) * item.quantity}{" "}
                                        <span className="text-sm font-medium text-gray-400">
                                          EGP
                                        </span>
                                      </p>
                                    </div>

                                    <button
                                      className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                                      title="Remove item"
                                      aria-label="Remove from cart"
                                      onClick={() => {
                                        handleRemoveGuestItem(item.productId);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-sm"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
              </div>

              {/* Clear Cart - Positioned below items as subtle action*/}
              <div className=" mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-base font-medium transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
                  <span>Continue Shopping</span>
                </Link>

                <button
                  onClick={handleClearCart}
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-xs group-hover:scale-110 transition-transform"
                  />

                  <span>Clear all items</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}

            <div className="lg:col-span-1">
              <CartSummary
                totalCartPrice={totalCartPrice}
                numberOfCartItems={numberOfCartItems}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
