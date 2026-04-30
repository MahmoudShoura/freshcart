import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function TitleSection() {
  return (
    <>
      <div className="h-full flex items-center justify-center  ">
        <div className="overlay py-15 text-white p-4 w-full h-full content-center bg-linear-to-r from-primary-600/80 to-primary-600/90">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link
              href="/"
              className="text-md hover:text-white text-gray-200 transition"
            >
              Home
            </Link>
            <span className="text-white font-bold text-md">/</span>
            <span className="text-white font-bold text-md ">Categories</span>
          </nav>

          <div className="flex items-center justify-center gap-3">
            <div>
              <div className="w-14 h-14 rounded-2xl  bg-primary-400 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="text-3xl text-white   "
                />
              </div>
            </div>

            <div className="px-3 py-3 h-full content-center w-full">
              <h2 className="text-white text-4xl font-bold mb-1 max-96">
                All Categories
              </h2>
              <p>Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


