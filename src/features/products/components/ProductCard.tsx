"use client";

import {
  faArrowsRotate,
  faPlus,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../types/Products.types";
import Rating from "@/components/ui/Rating";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";
import {
  WishlistProduct,
  WishlistError,
} from "@/features/wishlist/types/wishlist.types";
import { setWishlistIds } from "@/features/wishlist/store/wishlist.slice";
import Image from "next/image";

export default function ProductCard({ info }: { info: Product }) {
  const {
    id,
    category,
    title,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch();
  const { handleAddToCart } = useAddToCart();
  const { wishlistIds } = useAppSelector((state) => state.wishlist);
  const isInWishlist = wishlistIds.includes(id);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;

  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const handleAddToWishlist = async () => {
    try {
      if (isInWishlist) {
        const response = await removeFromWishlist(id);
        if (response) {
          // The API returns an array of strings (IDs) for POST/DELETE
          dispatch(setWishlistIds(response as unknown as string[]));
          toast.success("Product removed successfully from your wishlist");
        }
      } else {
        const response = await addToWishlist(id);
        if (response) {
          dispatch(setWishlistIds(response as unknown as string[]));
          toast.success("Product added successfully to your wishlist");
        }
      }
    } catch (error: unknown) {
      const err = error as WishlistError;
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update wishlist 'Login First'",
      );
    }
  };

  return (
    <>
      <div
        id="product-card"
        className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
      >
        <div className="relative">
          <Link className="block" href={`/products/${id}`}>
            <Image
              className="w-full h-60 object-contain bg-white"
              src={imageCover}
              alt={title}
              width={500}
              height={500}
            />
          </Link>

          <div className=" absolute top-3 left-3">
            {onSale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>

          <div
            className="absolute top-3 right-3 flex flex-col space-y-2"
            dir="ltr"
          >
            <button
              onClick={handleAddToWishlist}
              className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isInWishlist
                  ? "text-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              <FontAwesomeIcon
                icon={isInWishlist ? faHeartSolid : faHeartRegular}
              />
            </button>

            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>

            <Link
              href={`/products/${id}`}
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="text-xs text-gray-500 mb-1 text-start" dir="ltr">
            {category.name}
          </div>
          <h3
            className="font-medium mb-2 cursor-pointer text-start min-h-14 leading-7"
            dir="ltr"
          >
            <Link
              className="line-clamp-2 hover:text-emerald-600 transition"
              href={`/products/${id}`}
            >
              {title}
            </Link>
          </h3>

          <div className="flex items-center mb-2 gap-2" dir="ltr">
            <div className="flex text-sm text-amber-400">
              <Rating rating={ratingsAverage} />
            </div>

            <span className="text-xs text-gray-500">
              {ratingsAverage}({ratingsQuantity} reviews)
            </span>
          </div>

          <div className="mt-auto pt-3 flex items-end justify-between gap-3">
            <div dir="ltr" className="text-left flex-1 min-w-0">
              <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                {priceAfterDiscount || price} EGP
              </span>
              {onSale && (
                <span className="text-sm text-gray-500 line-through ml-2 whitespace-nowrap">
                  {price} EGP
                </span>
              )}
            </div>

            <button
              className="bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-900"
              onClick={() => handleAddToCart(info)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
