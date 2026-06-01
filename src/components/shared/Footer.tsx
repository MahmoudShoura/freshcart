import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";

import freshCartMiniLogo from "../../assets/images/mini-logo.png";
import freshCartFullLogo from "../../assets/images/freshcart-logo.svg";
import { getAllCategories } from "@/features/categories/server/categories.actions";

export default async function Footer() {
  const { data: categories } = await getAllCategories();

  return (
    <>
      <footer className="py-5 bg-white border-t border-gray-400/20">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-20 py-8">
            <div className="xl:col-span-2 space-y-3">
              <Image src={freshCartFullLogo} alt="Fresh Cart Logo" />
              <p>
                FreshCart is a versatile e-commerce platform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seamless <br></br>{" "}
                <span className="text-left" dir="ltr"></span> shopping across
                diverse categories.
              </p>

              <ul className="flex items-center gap-4 *:text-gray-500 text-lg *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faPinterestP} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Categories</h2>

              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                {categories
                  .filter((category) =>
                    [
                      "Men's Fashion",
                      "Women's Fashion",
                      "Baby & Toys",
                      "Beauty & Health",
                      "Electronics",
                    ].includes(category.name),
                  )
                  .map((category) => (
                    <li key={category._id}>
                      <Link href={`/categories/${category._id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>

              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link href="/about">About Us</Link>
                </li>

                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Services</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Customer Services</h2>

              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link href="/account">My Account</Link>
                </li>

                <li>
                  <Link href="/orders">My Orders</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/returns-and-refunds">Returns & Refund</Link>
                </li>
                <li>
                  <Link href="/help-center">Help Center</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center py-5 border-t border-gray-400/20">
            <p>
              &copy; {new Date().getFullYear()} Freshcart. All Rights Reserved.
            </p>
            <Image
              src={freshCartMiniLogo}
              alt="Fresh Cart Logo"
              className="w-8"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
