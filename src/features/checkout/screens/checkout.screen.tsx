"use client";

import { faTruck } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faBox,
  faReceipt,
  faShieldAlt,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  shippingAddressSchema,
  shippingAddressValues,
} from "../schemas/checkout.schema";
import ShippingForm from "../components/ShippingForm";
import PaymentMethods from "../components/PaymentMethods";
import { useState } from "react";
import { createCashOrder, createonlineOrder } from "../server/checkout.actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/cart/store/cart.slice";

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const { cartId, totalCartPrice, numberOfCartItems } = useAppSelector((state) => state.cart);

  const router = useRouter();

  const dispatch = useAppDispatch();

  
  const subtotal = totalCartPrice;
  const shipping = subtotal > 500 ? 0 : 100;
  const total = Math.round(shipping + subtotal);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },

    resolver: zodResolver(shippingAddressSchema),

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<shippingAddressValues> = async (values) => {
    try {
      if (!cartId) {
        return;
      }

      if (paymentMethod === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: values,
        });
        console.log(response);

        if (response.status === "success") {
          dispatch(clearCart());
          toast.success("Order Created successfully");
          reset();
          setTimeout(() => {
            router.push("/orders");
          }, 3000);
        }
      } else {
        const response = await createonlineOrder({
          cartId,
          shippingAddress: values,
          url: location.origin,
        });
        if (response.status === "success") {
          dispatch(clearCart());
          toast.loading("redirecting you to payment gateway");
          setTimeout(() => {
            location.href = response.session.url;
          }, 3000);
        }
      }
    } catch (error) {}
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Checkout Progress Header */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="hover:text-primary-600 transition">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faReceipt} />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>

            <Link
              href="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingForm register={register} errors={errors} />

              <PaymentMethods
                selectedMethod={paymentMethod}
                changeMethod={setPaymentMethod}
              />
            </div>

            {/* Right Column - Order Summary  */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xl sticky top-4">
                {/* Header */}
                <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    Order Summary
                  </h2>

                  <p className="text-primary-100 text-sm mt-1">
                    {numberOfCartItems} {numberOfCartItems === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="p-5">
                  {/* Cart Items Preview */}
                  {/* <div className="space-y-3 max-h-56 overflow-x-auto mb-5 pr-1">
                      {products.map ((item)=>())}
                      <div>

                  <hr className="border-gray-100 my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal </span>
                      <span className="font-medium">{subtotal} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="text-gray-400"
                        />
                        Shipping
                      </span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        <span className="font-medium">{shipping} EGP</span>
                      )}
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-600">
                          {total}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-colors duration-100"
                  >
                    <>
                      <FontAwesomeIcon icon={faShieldAlt} /> {"  "}
                      Proceed to Payment
                    </>
                  </button>
                  {/* Trust Badges */}
                  <div className=" flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className=" flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="text-green-500"
                      />
                      <span>Secure</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-blue-500"
                      />
                      <span>Fast Delivery</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faBox}
                        className="text-orange-500"
                      />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
