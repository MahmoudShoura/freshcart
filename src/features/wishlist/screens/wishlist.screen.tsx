"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setWishlist } from "../store/wishlist.slice";
import { WishlistProduct } from "../types/wishlist.types";
import WishlistItem from "../components/WishlistItem";
import { faArrowLeft, faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface WishlistScreenProps {
  initialWishlist: WishlistProduct[];
}

export default function WishlistScreen({
  initialWishlist = [],
}: WishlistScreenProps) {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setWishlist(initialWishlist));
  }, [dispatch, initialWishlist]);

  if (!products.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="flex flex-col items-center justify-center h-[50vh] max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-400 text-4xl"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your wishlist is empty
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Link
              href="/featured-products"
              className="flex-1 text-xl bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Browse Products {"  "}
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-100">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Product
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="py-4 px-6 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <WishlistItem key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-base font-medium transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
