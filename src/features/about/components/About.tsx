import {
  faHeadset,
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16  ">
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary-600">
            About FreshCart
          </h1>
          <p className="text-gray-600 text-2xl">
            Making everyday shopping simple, affordable, and fast.
          </p>
          <p className="text-gray-600 text-2xl">
            FreshCart is a modern ecommerce platform built to provide a seamless
            shopping experience. From fashion to essentials, we bring quality
            products to your doorstep with speed and reliability.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-4xl font-semibold text-primary-600 pb-1 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 text-2xl">
            Our mission is to make online shopping easy, secure, and accessible
            to everyone. We focus on customer satisfaction, high-quality
            products, and fast delivery.
          </p>

          <section className="text-center mt-14">
            <Link
              href="/"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-3xl inline-block transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </section>
        </section>
      </div>

      <section className="bg-green-50 py-6 rounded-xl ">
        <h2 className="text-2xl font-semibold text-primary-600 pb-2 ps-4 ">
          Why Choose Us
        </h2>

        <div className="max-w-8xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-xl space-x-3">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-green-600 text-xl">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div>
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-green-600 text-xl">
              <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div>
              <h4 className="font-semibold">Easy Returns</h4>
              <p className="text-gray-500">14-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-green-600 text-xl">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-gray-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-green-600 text-xl">
              <FontAwesomeIcon icon={faHeadset} />
            </div>
            <div>
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-gray-500">Contact us anytime</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
