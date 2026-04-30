"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLeaf,
  faTruckFast,
  faLock,
  faStar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

export default function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl my-16">
      <div className="mx-auto px-4 container rounded-4xl bg-linear-to-b from-emerald-50/30 to-emerald-100/80 p-6 flex flex-col md:p-12 lg:flex-row items-center gap-10 shadow-sm border border-emerald-100 ">
        <div className="grid items-center gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          {/* LEFT */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-500 text-white w-13 h-12 flex justify-center items-center rounded-2xl shadow-lg shadow-emerald-300">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              </div>
              <div>
                <p className="text-emerald-600 text-xs font-bold tracking-widest uppercase mb-0.5">
                  Newsletter
                </p>
                <p className="text-gray-500 text-xs">50,000+ subscribers</p>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-[28px] sm:text-[34px] font-extrabold leading-tight text-gray-900">
              Get the Freshest Updates{" "}
              <span className="text-emerald-600"> Delivered Free</span>
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-gray-600">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* TAGS — inline, equal width, same width as input */}
            <div className="mb-8 max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: faLeaf, text: "Fresh Picks Weekly" },
                { icon: faTruckFast, text: "Free Delivery Codes" },
                { icon: faLock, text: "Members-Only Deals" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-gray-700 shadow-sm"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-emerald-600 text-xs"
                    />
                  </div>
                  <span className="whitespace-nowrap truncate">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input + Button */}
            <div className="flex max-w-xl flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl bg-white px-4 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              />

              <button className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-700 to-emerald-400 px-6 text-sm font-semibold text-white shadow-lg transition hover:from-emerald-800 hover:to-emerald-600">
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* RIGHT (smaller) */}
          <div className="w-full lg:w-105 bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-2xl">
            {/* تأثير الإضاءة الخلفية */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-emerald-500 opacity-20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <span className="inline-block bg-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-emerald-500/30 mb-4">
                📱 Mobile App
              </span>
              <h3 className="text-2xl font-bold mb-3">
                Shop Faster on Our App
              </h3>
              <p className="text-slate-400 text-sm mb-8">
                Get app-exclusive deals & 15% off your first order.
              </p>

              {/* أزرار التحميل */}
              <div className="space-y-4 mb-8">
                <button className="w-full flex items-center gap-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl transition-all">
                  <FontAwesomeIcon icon={faApple} className="text-3xl ml-2" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                      Download on
                    </p>
                    <p className="text-lg font-bold">App Store</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl transition-all">
                  <FontAwesomeIcon
                    icon={faGooglePlay}
                    className="text-3xl ml-2 text-emerald-400"
                  />
                  <div className="text-left">
                    <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                      Get it on
                    </p>
                    <p className="text-lg font-bold">Google Play</p>
                  </div>
                </button>
              </div>

              {/* التقييمات */}
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
                </div>
                <span>4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
