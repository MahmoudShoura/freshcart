"use client";

import Link from "next/link";
import { faClock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// 1. مكون العداد التنازلي (مفصول لسهولة إعادة الاستخدام)
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center justify-center rounded-xl  bg-black/20 px-3 py-2 min-w-17.5 backdrop-blur-sm shadow-sm">
    <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[11px] font-semibold uppercase tracking-wider text-white opacity-90 mt-0.5">
      {label}
    </span>
  </div>
);

// 2. مكون العداد التنازلي
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-2 flex gap-3">
      {/* استدعاء TimeBox بشكل طبيعي */}
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
};
export default function DealsBanner() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Deal of the Day */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary-400 to-primary-700 p-8">
            <div className="absolute top-0 right-0 w-45 h-50 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 bg-black/15 px-3 py-1 rounded-full">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-xs text-white"
                />
                <span className="text-white ">Deal of the Day</span>
              </div>

              <h3 className="text-3xl md:text-3xl font-bold mb-2 text-white">
                Fresh Organic Fruits
              </h3>

              <p className="text-white mb-4 text-sm opacity-90">
                Get up to 40% off on selected organic fruits
              </p>

              {/* countdown Timer Placeholder */}

              {/* Discount Info */}
              <div className="mb-2 flex flex-col gap-3 md:flex-row items-center text-white ">
                <CountdownTimer />
                <span className="text-sm font-medium opacity-90 ps-2">
                  Use code: <strong className="font-bold">ORGANIC40</strong>
                </span>
              </div>
              <Link
                href={"/deals"}
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          {/* New Arrivals */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-orange-700 p-8">
            <div className="absolute top-0 right-0 w-50 h-45 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center mb-4 gap-2 bg-white/20 px-3 py-1 rounded-full text-white">
                <span>🌟</span>
                <span>New Arrivals</span>
              </div>

              <h3 className="text-3xl md:text-3xl font-bold mb-2 text-white">
                Exotic Vegetables
              </h3>

              <p className="text-white/80 mb-4 text-sm opacity-90">
                Discover our latest collection of premium vegetables
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-bold text-white">25% OFF</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">Fresh25</span>
                </div>
              </div>

              <Link
                href={"/products?sort=newest"}
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Explore Now
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
