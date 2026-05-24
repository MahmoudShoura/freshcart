import {
  faClock,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
export default function LoginHero() {
  return (
    <div className="block self-center pb-3 lg:pb-10">
      <div className="text-center space-y-4 md:space-y-6">
        <div className="rounded-2xl overflow-hidden bg-[#f6fbe9] border border-[#edf3dd] shadow-md">
          <Image
            src="/login-hero-v2.png"
            alt="FreshCart grocery delivery"
            width={700}
            height={500}
            priority
            className="w-full max-h-44 md:max-h-52 lg:max-h-none object-contain rounded-2xl"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-md mx-auto">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="hidden md:flex items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-500 flex-wrap">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-primary-600 mr-2"
              />
              Free Delivery
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-primary-600 mr-2"
              />
              Secure Payment
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faClock}
                className="text-primary-600 mr-2"
              />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
