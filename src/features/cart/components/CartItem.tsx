"use client";

import {
  faCheck,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Swal from "sweetalert2";

import { CartItem as CartItemType } from "../types/cart.types";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../server/cart.actions";
import { toast } from "react-toastify";
import { removeProduct, setCartInfo } from "../store/cart.slice";
import { useAppDispatch } from "@/store/store";

export default function CartItem({ info }: { info: CartItemType }) {
  const { _id, count, price, product } = info;
  const { brand, category, imageCover, quantity, title, id } = product;

  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    const result = await Swal.fire({
      html: `<div className="text-center py-2">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-red-500">
               <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </div>

              <h3 style="font-weight:700;"  class="text-2xl font-bold text-gray-900 mb-2 ">Remove item?</h3>
                <p class="text-gray-500 text-md leading-relaxed">
                remove <span class="font-semibold text-gray-700 text-lg ">${title.slice(0, 40)}${title.length > 40 ? "..." : ""}</span> from your cart?
                </p>
              </div>`,

      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      buttonsStyling: false,

      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex-row-reverse",
        confirmButton: `bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200`,
        cancelButton: `bg-gray-100 hover:bg-gray-700 hover:text-white   font=semibold py-3 px-6 rounded-xl transition-all duration-200`,
      },
    });

    if (result.isConfirmed) {
      dispatch(removeProduct({ id }));
      const response = await removeProductFromCart(id);
      toast.success("Item removed from cart");
    }
  };

  const handleUpdate = async (newCount: number) => {
    if (newCount < 1) return;

    try {
      const response = await updateProductQuantity(id, newCount);
      dispatch(setCartInfo(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300`}
      >
        <div className="p-4 sm:gap-5">
          <div className="flex gap-4 sm:gap-6">
            {/* Product Image */}
            <Link href={`/products/${id} `} className="relative shrink-0 group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 hover:scale-110 transition-transform duration-500 ">
                <img
                  src={imageCover}
                  alt={title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* In Stock Badge */}
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full  ">
                <FontAwesomeIcon icon={faCheck} className="text-[8px]" />
                In Stock
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Top Section: Category & Title */}
              <div className="mb-3">
                <Link href={`/products/${id} `} className="group/title">
                  <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed  ">
                    {title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 rounded-full text-sm">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-400 ">.</span>
                  <span className="text-xs text-gray-500">
                    SKU: {_id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Price Section  */}

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-primary-600 font-bold text-lg">
                    {price} EGP
                  </span>
                  <span className="text-xs text-gray-400">per unit</span>
                </div>
              </div>

              {/* Bottom Section : Quantity Controls % Actions  */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                {/* Quantity Selector */}

                <div className="flex items-center">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200 ">
                    <button
                      className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors  duration-300 "
                      aria-label="Decrease quantity"
                      disabled={count <= 1}
                      onClick={() => {
                        handleUpdate(count - 1);
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-xs" />
                    </button>

                    <span className="w-12 text-center font-bold text-gray-900">
                      {count}
                    </span>

                    <button
                      className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 hover:text-white transition-colors duration-300"
                      aria-label="Increase quantity"
                      disabled={count >= quantity}
                      onClick={() => {
                        handleUpdate(count + 1);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-0.5">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      {price * count}{" "}
                      <span className="text-sm font-medium text-gray-400">
                        EGP
                      </span>
                    </p>
                  </div>

                  {/* Remove Button  */}

                  <button
                    className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                    title="Remove item"
                    aria-label="Remove from cart"
                    onClick={handleRemove}
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
