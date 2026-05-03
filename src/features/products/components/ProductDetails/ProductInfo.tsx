"use client";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRotateLeft,
  faBolt,
  faCartShopping,
  faMinus,
  faPlus,
  faShareNodes,
  faShieldHalved,
  faTruckFast,
  faHeart as faHeartSolid,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../../types/Products.types";
import {
  WishlistProduct,
  WishlistError,
} from "@/features/wishlist/types/wishlist.types";
import Rating from "@/components/ui/Rating";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useState } from "react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setWishlist,
  setWishlistIds,
} from "@/features/wishlist/store/wishlist.slice";
import { toast } from "react-toastify";

export default function ProductInfo({ product }: { product: Product }) {
  const {
    id,
    title,
    category,
    description,
    images,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
    quantity,
    subcategory,
    brand,
  } = product;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const isLowStock = quantity > 0 && quantity < 10;

  const [count, setCount] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useAppDispatch();
  const { wishlistIds } = useAppSelector((state) => state.wishlist);
  const isInWishlist = wishlistIds.includes(id);

  async function handleAddToWishlist() {
    try {
      if (isInWishlist) {
        const response = await removeFromWishlist(id);
        dispatch(setWishlistIds(response as unknown as string[]));
        toast.success("Product removed from wishlist");
      } else {
        const response = await addToWishlist(id);
        dispatch(setWishlistIds(response as unknown as string[]));
        toast.success("Product added to wishlist");
      }
    } catch (error: unknown) {
      console.error(error);
      const err = error as WishlistError;
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update wishlist 'Login First'";
      toast.error(message);
    }
  }

  async function handleAddToCart() {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const response = await addProductToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        const CartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(CartInfo));
      }
    } catch (error) {
      toast.error("Failed to add product to cart 'Login First'");
    } finally {
      setIsAddingToCart(false);
    }
  }

  return (
    <section id="product-details" className="py-6">
      <div className="container mx-auto pt-2 px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 ps-8 mb-6">
          <Link
            href="/"
            className="hover:text-primary-600 transition-colors duration-200 font-extrabold"
          >
            Home
          </Link>
          <span className="text-gray-400 font-extrabold">/</span>
          <Link
            href={`/categories/${category._id}`}
            className="hover:text-primary-600 transition-colors duration-200 font-extrabold"
          >
            {category.name}
          </Link>
          {subcategory && subcategory.length > 0 && (
            <>
              <span className="text-gray-400 font-extrabold">/</span>
              <Link
                href={`/categories/subcategory/${subcategory[0]._id}`}
                className="hover:text-primary-600 transition-colors duration-200 font-extrabold"
              >
                {subcategory[0].name}
              </Link>
            </>
          )}
          <span className="text-gray-400 font-extrabold">/</span>
          <span className="text-gray-900  truncate max-w-75 font-extrabold">
            {title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images - Wider layout  */}
          <div id="product-images" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sti top-4">
              <ImageGallery
                items={images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
              />
            </div>
          </div>

          {/* Product Info */}

          <div id="product-info" className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Category & Brand Badges */}

              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  href={`/categories/${category._id}`}
                  className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors duration-300"
                >
                  {category.name}
                </Link>

                <Link
                  href={`/brands/${brand._id}`}
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  {brand.name}
                </Link>
              </div>

              {/* Title */}

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h1>

              {/* Ratings */}

              <div className="flex items-center gap-3 mb-4">
                <Rating rating={ratingsAverage} />

                <span>
                  {ratingsAverage}({ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price Section */}

              <div className=" flex items-center flex-wrap gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {priceAfterDiscount || price} EGP
                </span>

                {onSale && (
                  <>
                    <span className=" text-lg text-gray-400 line-through">
                      {price} EGP
                    </span>

                    <span className=" bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}

              <div className="flex items-center gap-2 mb-6">
                {quantity > 0 ? (
                  <span
                    className={
                      "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700"
                    }
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLowStock ? "bg-yellow-600" : "bg-green-500"
                      }`}
                    ></span>
                    {isLowStock
                      ? `Only ${quantity} left - order soon!`
                      : "In Stock"}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className=" border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Quantity Selector */}
              <div className=" mb-6">
                <label className=" block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4 ">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      id="decrease-qty"
                      onClick={() => {
                        setCount(count - 1);
                      }}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-10"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={count}
                      onChange={(e) => {
                        setCount(+e.target.value);
                      }}
                      className="w-16 text-center border-0 focus:outline-none  text-lg  font-medium"
                      id="quantity"
                    />

                    <button
                      id="increase-qty"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-10"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    {quantity} available
                  </span>
                </div>
              </div>

              {/* Total Price */}

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center ">
                  <span className="text-gray-600">Total Price:</span>

                  <span className="text-2xl font-bold text-primary-600">
                    {count * (priceAfterDiscount || price)} EGP
                  </span>
                </div>
              </div>

              {/* Action Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  id="add-to-cart"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 active:scale-98 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                >
                  {isAddingToCart ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  id="buy-now"
                  className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-100"
                >
                  <FontAwesomeIcon icon={faBolt} />
                  Buy Now
                </button>
              </div>

              {/* Wishlist & Share */}

              <div className="flex gap-3 mb-6">
                <button
                  id="wishlist-button"
                  onClick={handleAddToWishlist}
                  className={`flex-1 border-2 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2
                    ${
                      isInWishlist
                        ? "border-red-100 text-red-600 bg-red-50"
                        : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={isInWishlist ? faHeartSolid : faHeartRegular}
                  />
                </button>

                <button className="border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300">
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>

              {/* Trust Badges */}

              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100  text-primary-600 rounded-full flex items-center justify-center shadow">
                      <FontAwesomeIcon icon={faTruckFast} />
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Free Delivery
                      </h4>

                      <p className="text-xs text-gray-500 ">Orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full  flex items-center justify-center shadow">
                      <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 text-sm ">
                        30 Days Return
                      </h4>

                      <p className="text-xs ">Money Back</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shadow">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Secure Payment
                      </h4>

                      <p className="text-xs text-gray-500">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
