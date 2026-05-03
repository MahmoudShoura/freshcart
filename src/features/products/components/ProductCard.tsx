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
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
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
  const { wishlistIds } = useAppSelector((state) => state.wishlist);
  const isInWishlist = wishlistIds.includes(id);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;

  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart({ productId: id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        //TODO :Set cart info => Slice
        const CartInfo = await getLoggedUserCart();
        setCartInfo(CartInfo); //^action creator
        dispatch(setCartInfo(CartInfo));
      }
    } catch (error) {
      //TODO
      toast.error("failed to add product'Login First'");
    }
  };

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
        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
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

          <div className="absolute top-3 right-3 flex flex-col space-y-2">
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

        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1"> {category.name} </div>
          <h3 className="font-medium mb-1 cursor-pointer">
            <Link
              className="line-clamp-2 hover:text-emerald-600 transition"
              href={`/products/${id}`}
            >
              {title}
            </Link>
          </h3>

          <div className=" flex items-center mb-2">
            <div className="flex text-sm text-amber-400 mr-2">
              <Rating rating={ratingsAverage} />
            </div>

            <span className="text-xs text-gray-500">
              {ratingsAverage}({ratingsQuantity} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-600">
                {priceAfterDiscount || price} EGP
              </span>
              {onSale && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {price} EGP
                </span>
              )}
            </div>

            <button
              className="bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-900"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
