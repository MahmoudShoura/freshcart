import { faEnvelope, faHeadset, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ContactInfo() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg opacity-90">
          We&apos;d love to hear from you. Get in touch with us anytime.
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">

          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-4 rounded-xl text-primary-600 text-xl">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Our Location</h4>
              <p className="text-gray-600">
                123 Fresh Street, Cairo, Egypt
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-4 rounded-xl text-primary-600 text-xl">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Phone Number</h4>
              <p className="text-gray-600">+20 123 456 7890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-4 rounded-xl text-primary-600 text-xl">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Email Address</h4>
              <p className="text-gray-600">support@freshcart.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-4 rounded-xl text-primary-600 text-xl">
              <FontAwesomeIcon icon={faHeadset} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Support</h4>
              <p className="text-gray-600">
                24/7 Customer Support Available
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Bottom Feature Banner */}
      <section className="bg-primary-50 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-primary-700">
            We&apos;re always here to help you 
          </h3>
        </div>
      </section>

    </div>
  )
}
