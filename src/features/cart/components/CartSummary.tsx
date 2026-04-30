import { faTruck } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faLock,
  faShieldAlt,
  faShoppingBag,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CartSummary({
  totalCartPrice,
  numberOfCartItems,
}: {
  totalCartPrice: number;
  numberOfCartItems: number;
}) {
  const subtotal = totalCartPrice;
  const shipping = subtotal > 500 ? 0 : 100;
  const total = Math.round(shipping + subtotal);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
        {/* Header */}

        <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingBag} />
            Order Summary
          </h2>

          <p className="text-primary-100 text-sm mt-1">
            You have {numberOfCartItems}{" "}
            {numberOfCartItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Free Shipping Progress */}
          {shipping > 0 && (
            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faTruck} className=" text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  Add {500 - subtotal} EGP for free shipping
                </span>
              </div>

              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full "
                  style={{ width: `${(subtotal / 500) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          {shipping === 0 && (
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center justify-start gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center     ">
                <FontAwesomeIcon icon={faTruck} className="text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-green-700">Free Shipping</p>
                <p className="text-sm text-green-600">
                  You qualify for free delivery
                </p>
              </div>
            </div>
          )}

          {/* Price Breakdown */}

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{subtotal} EGP</span>
            </div>

            <div className="flex justify-between  text-gray-600">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="font-medium text-green-600">FREE</span>
              ) : (
                <span className="font-medium text-gray-900">100</span>
              )}
            </div>

            {/* Divider with total */}

            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">Total</span>
                <div className="text-right">
                  <span className=" text-2xl font-bold text-gray-900">
                    {" "}
                    {total}{" "}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code Hint */}
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed rounded-xl hover:bg-primary-50 hover:text-primary-600 hover:border-primary-600 transition-all duration-300">
            <FontAwesomeIcon icon={faTag} />
            <span className="text-sm  font-medium">Apply Promo Code</span>
          </button>

          {/* Checkout Button */}

          <Link
            href="/checkout"
            className="w-full bg-linear-to-r from-primary-600 to-primary-700  hover:from-primary-700 hover:to-primary-800      text-white py-4 px-3 rounded-2xl  flex items-center justify-center gap-2  "
          >
            <FontAwesomeIcon icon={faLock} />
            <span>Secure Checkout</span>
          </Link>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faTruck} className="text-blue-500" />
              <span>Fast Delivery </span>
            </div>
          </div>

          {/* Continue Shopping */}

          <Link
            href="/"
            className="flex justify-center items-center gap-2 text-primary-600 hover:text-primary-700 text-base font-medium transition-colors duration-200"
          >
            <span>Continue Shopping</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-base" />
          </Link>
        </div>
      </div>
    </>
  );
}
