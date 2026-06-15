"use client";

import {
  faBoxOpen,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  const accountLinks = [
    { label: t.account, href: "/account", icon: faUser },
    { label: t.orders, href: "/account/orders", icon: faBoxOpen },
    { label: t.wishlist, href: "/account/wishlist", icon: faHeart },
    { label: t.cart, href: "/account/cart", icon: faCartShopping },
  ];

  return (
    <aside className="hidden lg:block sticky top-28 self-start bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">
          {t.accountCenter}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {t.accountCenterSubtitle}
        </p>
      </div>

      <nav className="p-3 space-y-2">
        {accountLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-50 text-primary-700 ring-1 ring-primary-100 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                  isActive
                    ? "bg-white text-primary-600 shadow-sm"
                    : "bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-primary-600"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
