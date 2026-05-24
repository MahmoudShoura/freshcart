import {
  faClock,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
export default function LoginHero() {
  return (
    <div className="block self-center pb-6 lg:pb-10">
      <div className="text-center space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-[#f6fbe9]">
          <Image
            src="/login-hero-v2.png"
            alt="FreshCart grocery delivery"
            width={700}
            height={500}
            priority
            className="w-full max-h-52 lg:max-h-none object-contain rounded-2xl shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
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
