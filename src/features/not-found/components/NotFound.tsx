import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHome,
  faSearch,
  faPhone,
  faEnvelope,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "@/features/categories/server/categories.actions";

export default async function NotFound() {
  const categoriesResponse = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      {/* 404 Section */}
      <div className="text-center max-w-3xl">
        <div className="flex items-center justify-center gap-4 relative">
          <h1 className="text-[120px] font-extrabold text-green-200">4</h1>
          <h1 className="text-[120px] font-extrabold text-green-200">0</h1>
          <div style={{ width: '45px', height: '45px' }} className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <FontAwesomeIcon
              icon={faShoppingCart}
              size="2x"
              className="text-green-600"
            />
          </div>
          <h1 className="text-[120px] font-extrabold text-green-200">4</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you're looking for seems to have gone shopping!
        </p>

        <p className="text-gray-400">
          Don't worry, our fresh products are still available for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/featured-products"
            className="flex items-center justify-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            Search Products
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
          Or explore our popular categories
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesResponse.data.slice(0, 8).map((category) => {
            return (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-3 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 font-medium">{category.name}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-16 w-full max-w-5xl bg-green-100 rounded-xl p-8 text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Need Help?</h4>
        <p className="text-gray-600 mb-6">
          Our customer support team is here to assist you 24/7
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-green-700 font-medium">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            +1 (800) 123-4567
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
            support@freshcart.com
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faComments} className="w-4 h-4" />
            Live Chat
          </div>
        </div>
      </div>
    </div>
  );
}
