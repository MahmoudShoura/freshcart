"use client";

import {
  faArrowLeft,
  faBox,
  faBoxOpen,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getUserOrders } from "../server/order.actions";
import OrderCard from "../components/OrderCard";

import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { OrdersResponse } from "../server/orders.types";

export default function OrdersScreen() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<null | OrdersResponse>(null);

  useEffect(() => {
    const userId = userInfo?.id;
    if (!userId) return;

    console.log("test is:", userId);
    const fetchOrders = async () => {
      const response = await getUserOrders({ id: userId });
      setOrders(response);
    };

    fetchOrders();
  }, [userInfo]);

  if (!userInfo) {
    return;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-4xl text-gray-400"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-500 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            When you place orders, they&apos;ll appear here <br /> so you can track
            them.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-2"
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className=" hover:text-primary-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>

          {/* Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to bg-primary-600 flex items-center justify-center">
                <FontAwesomeIcon icon={faBox} className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  My Orders
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {/* NUMBERS OF ORDERS */}
                  Track and manage your {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="self-start sm:self-auto flex items-center gap-2 text-primary-600 hover:text-primary-700 text-base font-medium transition-colors duration-200 p-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {/* DISPLAY orders HERE */}
          {orders.map((order) => (
            <OrderCard key={order._id} orderInfo={order} />
          ))}
        </div>
      </div>
    </>
  );
}
