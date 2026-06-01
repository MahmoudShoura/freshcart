"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faMagnifyingGlass,
  faPhone,
  faSignOutAlt,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/store/store";
import useLogout from "@/features/auth/hooks/useLogout";
import { getAllCategories } from "@/features/categories/server/categories.actions";
import { Category } from "@/features/categories/types/category.types";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";

export default function Navbar() {
  const { logout } = useLogout();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { numberOfCartItems } = useAppSelector((state) => state.cart);
  const { wishlistIds } = useAppSelector((state) => state.wishlist);

  function toggleMenu() {
    if (isMenuOpen) {
      setIsClosing(true);

      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 400);
    } else {
      setIsMenuOpen(true);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );

  const { language, setLanguage } = useLanguage();
  const currentLocale = language;

  const handleLocaleChange = (locale: "en" | "ar") => {
    setLanguage(locale);
    toggleMenu();
  };
  const t = translations[language];

  return (
    <>
      <header>
        <div className="container">
          {/* Top Navbar */}

          <div className=" hidden text-sm  lg:flex py-2 items-center justify-between border-b border-gray-300/30">
            <ul className="flex gap-5 items-center *:flex *:gap-2 *:items-center">
              <li>
                <FontAwesomeIcon icon={faPhone} />

                <a href="tel:+18001234567" dir="ltr" className="inline-block">
                  +1 (800) 123-4567
                </a>
              </li>

              <li>
                <FontAwesomeIcon icon={faEnvelope} />

                <a
                  href="mailto:support@freshcart.com"
                  dir="ltr"
                  className="inline-block"
                >
                  support@freshcart.com
                </a>
              </li>
            </ul>

            <ul className="flex gap-5 items-center">
              <li>
                <Link href="/orders">Track Order</Link>
              </li>

              <li>
                <Link href="/about">About</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li>
                <select>
                  <option>EGP</option>

                  <option>SAR</option>

                  <option>AED</option>
                </select>
              </li>

              <li>
                <select
                  value={language}
                  className="cursor-pointer bg-transparent outline-none"
                  onChange={(e) => {
                    setLanguage(e.target.value as "en" | "ar");
                  }}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </li>
            </ul>
          </div>

          {/* Main Navigation */}

          <nav className="flex justify-between items-center py-5">
            <h1>
              <Link href="/">
                <Image src={freshCartLogo} alt="fresh cart logo" />
              </Link>
            </h1>

            <search className="relative hidden lg:block">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="min-w-64 form-control pe-10 pe-4 ps-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />

              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </search>

            <ul className="hidden lg:flex gap-8 items-center">
              <li>
                <Link
                  className={`${pathname === "/wishlist" ? "text-primary-600" : ""} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                  href="/wishlist"
                >
                  <div className="relative">
                    <FontAwesomeIcon className="text-xl " icon={faHeart} />
                    <span className="absolute -right-3 top-0 -translate-y-1/2 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-[11px] font-bold">
                      {wishlistIds.length}
                    </span>
                  </div>

                  <span className="text-sm">{t.wishlist}</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${pathname === "/cart" ? "text-primary-600" : ""} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                  href="/cart"
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      className="text-xl"
                      icon={faCartShopping}
                    />

                    <span className="absolute -right-3 top-0 -translate-y-1/2 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-[11px] font-bold">
                      {numberOfCartItems}
                    </span>
                  </div>

                  <span className="text-sm">{t.cart}</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${pathname === "/account" ? "text-primary-600" : ""} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                  href="/account"
                >
                  <FontAwesomeIcon className="text-xl" icon={faUser} />

                  <span className="text-sm">{t.account}</span>
                </Link>
              </li>

              {isAuthenticated ? (
                <li
                  className={` cursor-pointer flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                  onClick={logout}
                >
                  <FontAwesomeIcon className="text-xl" icon={faSignOutAlt} />

                  <span className="text-sm">{t.logout}</span>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      className={`${pathname === "/signup" ? "text-primary-600" : ""} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                      href="/signup"
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUserPlus} />

                      <span className="text-sm">{t.signup}</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${pathname === "/login" ? "text-primary-600" : ""} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}
                      href="/login"
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faAddressCard}
                      />

                      <span className="text-sm">{t.login}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="lg:hidden btn  bg-primary-600 text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </nav>
        </div>

        {/* Category Navigation */}

        <nav className=" hidden lg:block  bg-gray-100 py-4">
          <div className="container flex gap-8 items-center">
            <div className="relative group">
              <button
                className="btn flex items-center gap-3 bg-primary-600 text-white hover:bg-primary-800/95"
                type="button"
              >
                <FontAwesomeIcon icon={faBars} />

                <span>All Categories</span>

                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <menu className="z-10  hidden group-hover:block absolute top-10 min-w-60 bg-white shadow *:py-3 *:hover:bg-gray-100 *:px-3 rounded-lg divide-y-2 divide-gray-300/20">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      className="flex gap-2 items-center hover:text-primary-500 font-bold ps-4  "
                      href={`/categories/${category._id}`}
                    >
                      <div className="w-6 h-6 relative">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="flex gap-2 items-center" href="/categories">
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      icon={faEllipsis}
                    />
                    <span>View All Categories </span>
                  </Link>
                </li>
              </menu>
            </div>

            <ul className=" flex gap-5">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/recently-added">Recently Added</Link>
              </li>
              <li>
                <Link href="/featured-products">Featured Products</Link>
              </li>
              <li>
                <Link href="/offers">Offers</Link>
              </li>
              <li>
                {" "}
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* offCanvas */}

        {isMenuOpen && (
          <>
            <div
              className={`background cursor-pointer fixed z-30 inset-0 bg-black/50 transition-opacity duration-400
  ${isClosing ? "opacity-0" : "opacity-100"}`}
              onClick={toggleMenu}
            ></div>

            <div
              className={`offcanvas space-y-5 fixed z-40 bg-white top-0 bottom-0 p-3 w-80
  ${currentLocale === "ar" ? "right-0" : "left-0"}
  ${
    isClosing
      ? currentLocale === "ar"
        ? "animate-slide-out-rtl"
        : "animate-slide-out"
      : currentLocale === "ar"
        ? "animate-slide-in-rtl"
        : "animate-slide-in"
  }`}
            >
              <div className="flex justify-between items-center border-b border-gray-300/50 mt-4 pb-4">
                <Link onClick={toggleMenu} href="/">
                  <Image src={freshCartLogo} alt="fresh cart logo" />
                </Link>

                <button
                  className="
w-9 h-9
rounded-full
flex items-center justify-center
bg-primary-500
hover:bg-primary-600
text-white
shadow-sm
transition-all duration-200
hover:scale-105
"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <search className="relative ">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="min-w-74 form-control pe-10 ps-4"
                />

                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute end-4 top-1/2 -translate-1/2"
                />
              </search>

              <div>
                <h2 className="text-xl font-bold"> {t.mainMenu}</h2>

                <ul className="  *:hover:bg-gray-100 *:rounded-lg transition-colors duration-s00 space-y-2 mt-3">
                  <li>
                    <Link
                      onClick={toggleMenu}
                      className={`${pathname === "/wishlist" ? "text-primary-600  bg-primary-100 rounded-lg" : ""} 

                  flex  items-center gap-2  transition-colors duration-200 px-2 py-3`}
                      href="/wishlist"
                    >
                      <div className="relative">
                        <FontAwesomeIcon className="text-xl " icon={faHeart} />
                        <span className="absolute -right-3 top-0 -translate-y-1/2 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-[11px] font-bold">
                          {wishlistIds.length}
                        </span>
                      </div>

                      <span className="text-sm">{t.wishlist}</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={toggleMenu}
                      className={`${pathname === "/cart" ? "text-primary-600 rounded-lg bg-primary-100" : " "}  flex items-center gap-2 transition-colors duration-200 px-2 py-3`}
                      href="/cart"
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCartShopping}
                        />

                        <span
                          className="absolute -right-3 top-0 -translate-y-1/2 size-5 flex justify-center items-center 
                                      rounded-full bg-primary-600 text-white text-[11px] font-bold"
                        >
                          {numberOfCartItems}
                        </span>
                      </div>

                      <span className="text-sm">{t.cart}</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={toggleMenu}
                      className={`${pathname === "/account" ? "text-primary-600 rounded-lg  bg-primary-100 " : ""} 

                  flex  items-center gap-2  transition-colors duration-200 px-3 py-3.5`}
                      href="/account"
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUser} />

                      <span className="text-sm">{t.account}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-300/50 pt-5">
                <h2 className="text-xl font-bold">{t.accountMenu}</h2>

                <ul className="  *:hover:bg-gray-100 *:rounded-lg transition-colors duration-s00 space-y-3 mt-4">
                  {isAuthenticated ? (
                    <li
                      className={` cursor-pointer   flex items-center gap-3

                    transition-colors duration-200 px-3 py-3.5`}
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faSignOutAlt}
                      />

                      <span className="text-sm">{t.logout}</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          onClick={toggleMenu}
                          className={`${pathname === "/signup" ? "text-primary-600 rounded-lg bg-primary-100" : ""} 

                  flex  items-center gap-2 transition-colors duration-200 px-3 py-3.5`}
                          href="/signup"
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faUserPlus}
                          />

                          <span className="text-sm">{t.signup}</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={toggleMenu}
                          className={`${pathname === "/login" ? "text-primary-600 rounded-lg bg-primary-100" : ""} 

                  flex  items-center gap-2  transition-colors duration-200 px-3 py-3.5`}
                          href="/login"
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faAddressCard}
                          />

                          <span className="text-sm">{t.login}</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="border-t border-gray-200 pt-5 mt-5">
                <h2 className="text-lg font-semibold mb-3">
                  {t.languageLabel}
                </h2>

                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-100 p-1">
                  <button
                    onClick={() => handleLocaleChange("en")}
                    className={`rounded-xl py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
${
  currentLocale === "en"
    ? "bg-white text-primary-600 shadow-sm"
    : "text-gray-600 hover:text-primary-600"
}`}
                  >
                    English US
                  </button>

                  <button
                    onClick={() => handleLocaleChange("ar")}
                    className={`rounded-xl py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
${
  currentLocale === "ar"
    ? "bg-white text-primary-600 shadow-sm"
    : "text-gray-600 hover:text-primary-600"
}`}
                  >
                    EG العربية
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
