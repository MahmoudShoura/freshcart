"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import sliderImg_1 from "../../../assets/images/home-slider-1.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <>
      <section className="relative">
        <Swiper
          dir="ltr"
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
        >
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay ps-14 py-20 text-white p-4 w-full h-full bg-linear-to-r from-primary-500/90 to-primary-400/30">
                <div className="container h-full content-center">
                  <h2 className="text-white text-4xl font-bold mb-4 max-96">
                    Fresh Products Delivered <br></br>to your Door
                  </h2>
                  <p>Get 20% off your first order</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100  flex items-center justify-center"
            >
              <div className="overlay ps-14 py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/30">
                <div className="container h-full content-center">
                  <h2 className="text-white text-4xl font-bold mb-4 max-96">
                    Premium Quality Guaranteed
                  </h2>
                  <p>Fresh from farm to your table</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-100 flex items-center justify-center"
            >
              <div className="overlay ps-14 py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/30">
                <div className="container h-full content-center">
                  <h2 className="text-white text-4xl font-bold mb-4 max-96">
                    Fast & Free Delivery
                  </h2>
                  <p>Same day delivery available</p>
                  <div className="mt-4">
                    <Link
                      href={`/products`}
                      className="btn bg-white border-2 border-white/50 text-green-500"
                    >
                      Order Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="btn bg-transparent border-2 border-white/50 text-white ml-2"
                    >
                      Delivery Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className="custom-prev size-12 absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white/70 hover:scale-110 transation rounded-full flex items-center justify-center">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-lg text-primary-500"
          />
        </button>

        <button className="custom-next size-12 absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white/70 hover:scale-110 transation rounded-full flex items-center justify-center">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-lg text-primary-500"
          />
        </button>
      </section>
    </>
  );
}
