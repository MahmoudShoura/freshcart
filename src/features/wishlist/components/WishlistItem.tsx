"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/store/store";
import { removeProduct } from "../store/wishlist.slice";
import { removeFromWishlist } from "../server/wishlist.actions";
import { addProductToCart } from "@/features/cart/server/cart.actions";
import { WishlistProduct, WishlistError } from "../types/wishlist.types";
import { useState } from "react";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import NextImage from "next/image";
import { toast } from "react-toastify";

interface WishlistItemProps {
  product: WishlistProduct;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
      setLoading(true);
      try {
        const cartResponse = await addProductToCart({ productId: product._id });
        dispatch(setCartInfo(cartResponse));
        toast.success("Product added to cart successfully");
      } catch (error: unknown) {
        console.error(error);
        const err = error as WishlistError;
        toast.error(err.response?.data?.message || err.message || "Failed to add product to cart");
      } finally {
        setLoading(false);
      }
    }

  async function handleRemove() {
    try {
      await removeFromWishlist(product._id);
      dispatch(removeProduct(product._id));
      toast.success("Product removed from wishlist");
    } catch (error: unknown) {
      const err = error as WishlistError;
      toast.error(err.response?.data?.message || err.message || "Failed to remove product");
    }
  }

  return (
    <tr className="hover:bg-gray-50 bg-white transition-colors duration-200">
      <td className="py-4 px-6 align-middle">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
            <NextImage
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Link 
              href={`/products/${product._id}`}
              className="font-semibold text-gray-900 line-clamp-1 hover:text-green-600 transition-colors duration-200"
            >
              {product.title}
            </Link>
            {product.category && (
              <p className="text-sm text-gray-400 mt-0.5">{product.category.name}</p>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 px-6 align-middle font-bold text-gray-900">
        {product.price} EGP
      </td>
      <td className="py-4 px-6 align-middle">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          In Stock
        </div>
      </td>
      <td className="py-4 px-6 align-middle text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors font-medium text-sm shadow-sm"
          >
            {loading ? (
                 <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
                <>
                <FontAwesomeIcon icon={faCartShopping} />
                Add to Cart
                </>
            )}
          </button>
          
          <button
            onClick={handleRemove}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
            title="Remove from wishlist"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
}
