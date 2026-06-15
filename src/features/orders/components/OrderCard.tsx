"use client";

import {
  faCreditCard,
  faCalendarDays,
  faHashtag,
  faMoneyBill,
  faTruck,
  faCircleCheck,
  faClock,
  faBox,
  faMapMarkerAlt,
  faChevronDown,
  faReceipt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../server/orders.types";
import { useState } from "react";
import Image from "next/image";

export default function OrderCard({ orderInfo }: { orderInfo: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function getStatus() {
    if (orderInfo.isDelivered) {
      return {
        label: "Delivered",
        icon: faCircleCheck,
        color: {
          background: "bg-green-100",
          text: "text-green-600",
          border: "border-green-300",
        },
      };
    }

    if (orderInfo.isPaid) {
      return {
        label: "On the way",
        icon: faTruck,
        color: {
          background: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-300",
        },
      };
    }

    return {
      label: "Processing",
      icon: faClock,
      color: {
        background: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-300",
      },
    };
  }

  const status = getStatus();
  const itemsCount = orderInfo.cartItems.reduce(
    (acc, el) => (acc += el.count),
    0,
  );

  return (
    <div
      className={`bg-white p-3 rounded-2xl  transition-all duration-300 overflow-hidden border-gray-100 shadow-sm border hover:shadow-2xl hover:border-primary-300`}
    >
      {/* Main Content */}
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Product Image Stack */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
              {orderInfo.cartItems[0] && (
                <Image
                  src={orderInfo.cartItems[0].product.imageCover}
                  alt=""
                  width={144}
                  height={144}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Multi-item indicator */}
            {orderInfo.cartItems.length > 1 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                +{orderInfo.cartItems.length - 1}
              </div>
            )}
          </div>

          {/* Order Info */}
          <div className="flex-1 min-w-0">
            {/* Status & Order Number Row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${status.color.background} rounded-lg mb-2`}
                >
                  <FontAwesomeIcon
                    icon={status.icon}
                    className={`text-xs ${status.color.text}`}
                  />
                  <span
                    className={`text-xs font-semibold ${status.color.text}`}
                  >
                    {status.label}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="text-xs text-gray-400"
                  />
                  {orderInfo.id}
                </h3>
              </div>
              {/* Payment Method  */}
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  orderInfo.paymentMethodType === "card"
                    ? "text-purple-100"
                    : "bg-gray-100"
                }`}
              >
                <FontAwesomeIcon
                  icon={
                    orderInfo.paymentMethodType === "card"
                      ? faCreditCard
                      : faMoneyBill
                  }
                  className={
                    orderInfo.paymentMethodType === "card"
                      ? "text-purple-600"
                      : "text-gray-600"
                  }
                />
              </div>
            </div>

            {/* Date & items */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-xs text-gray-400"
                />
                {new Date(orderInfo.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faBox}
                  className="text-xs text-gray-400"
                />
                {itemsCount} {itemsCount === 1 ? "items" : "items"}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-xs text-gray-400"
                />
                {orderInfo.shippingAddress.city}
              </span>
            </div>

            {/* Price & Action Row */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {orderInfo.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all 
                  ${isExpanded ? "bg-primary-500 text-white hover:bg-primary-600" : " bg-gray-100 text-gray-700 hover:bg-gray-200"}
                  `}
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Hide" : "Details"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-xs transition-transform duration-300 ${isExpanded && "rotate-180"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}

      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          {/* Products List */}
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faReceipt}
                  className="text-xs text-primary-600"
                />
              </div>
              Order Items
            </h4>
            <div className="space-y-3">
              {orderInfo.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      * {item.price.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {(item.count * item.price).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Summary  */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            {/* Shipping Address */}
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-xs text-blue-600"
                  />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {orderInfo.shippingAddress.city}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {orderInfo.shippingAddress.details}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-xs text-gray-400"
                  />
                  {orderInfo.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 rounded-xl bg-blue-100 border border-blue-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="text-xs text-white   "
                  />
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{orderInfo.totalOrderPrice} EGP</span>
                  <span className="font-medium">Price</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    {orderInfo.shippingPrice === 0
                      ? "Free"
                      : orderInfo.shippingPrice + " EGP"}{" "}
                  </span>
                  <span>Shipping Price</span>
                </div>

                <hr className=" border-gray-200/50 my-2" />
                <div className="flex justify-between  ">
                  <span className="font-semibold text-gray-900">
                    {orderInfo.totalOrderPrice + orderInfo.shippingPrice} EGP
                  </span>
                  <span className="font-bold text-lg text-gray-900">
                    Total Price
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
