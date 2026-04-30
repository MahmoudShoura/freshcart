"use client";

import { AppState, useAppSelector } from "@/store/store";
import {
  faArrowLeft,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function CartScreen() {
  const { numberOfCartItems, products, totalCartPrice } = useAppSelector(
    (state) => state.cart,
  );

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
                {products.map((product) => (
                  <CartItem key={product._id} info={product} />
                ))}
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

                <button className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
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
