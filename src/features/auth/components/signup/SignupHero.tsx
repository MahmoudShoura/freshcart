import {
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewAuthorImg from "../../../../assets/images/review-author.png";
import Image from "next/image";

export default function SignupHero() {
  return (
    <div className="space-y-8 py-10">
      <div className="welcome-msg">
        <h2 className="text-4xl font-bold">
          Welcome to <span className="text-primary-600">FreshCart</span>
        </h2>
        <p className="text-lg m-2">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorsteps
        </p>
      </div>

      <ul className="space-y-5    *:flex *:items-center *:gap-3">
        <li>
          <div className="icon size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
            <FontAwesomeIcon icon={faStar} />
          </div>

          <div className="content">
            <h3 className="font-semibold">Premium Quality</h3>
            <p className="text-gray-600">Premium quality products sourced from trusted suppliers.</p>
          </div>
        </li>

        <li>
          <div className="icon size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
            <FontAwesomeIcon icon={faTruckFast} />
          </div>

          <div className="content">
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-gray-600">Same-day delivery available in most areas</p>
          </div>
        </li>

        <li>
          <div className="icon size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>

          <div className="content">
            <h3 className="font-semibold">Secure Shopping</h3>
            <p className="text-gray-600">Your data and payments are completely secure</p>
          </div>
        </li>
      </ul>

      <div className="review p-6 rounded-xl bg-white shadow-md ">
        <div className="flex items-center gap-3">
          <Image src={reviewAuthorImg} className="size-12 rounded-full" alt=" Sarah Johnson profile image " />
          <div>
            <h3>Sarah Johnson</h3>
            <div className="rating">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-yellow-400"/>
              <FontAwesomeIcon icon={faStar} className="text-yellow-400"/>
            </div>
          </div>
        </div>

        <blockquote className="text-gray-700 italic mt-4">
            <p >&quot;FreshCart has transformed my shopping experience. 
                The quality of products is outstanding, and the delivery is always on time. Highly recommend!&quot;</p>
        </blockquote>
      </div>
    </div>
  );
}
