"use client";

import {
  faBoxOpen,
  faCartShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accountLinks = [
  { label: "Account", href: "/account", icon: faUser },
  { label: "Orders", href: "/account/orders", icon: faBoxOpen },
  { label: "Wishlist", href: "/account/wishlist", icon: faHeart },
  { label: "Cart", href: "/account/cart", icon: faCartShopping },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block sticky top-28 self-start bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Account Center</h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage your profile and activity
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
