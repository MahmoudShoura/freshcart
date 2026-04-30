"use client";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Account() {
  return (
    <>
      <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Account Details
          </h2>

          <div className="pb-8 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Profile Picture
            </h3>

            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full object-cover border border-gray-500 shadow-sm"
                />

                <div className="absolute bottom-1 right-1 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                  <FontAwesomeIcon icon={faCamera} className="text-sm" />
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-4">
                  Upload a new profile picture
                </p>

                <div className="flex gap-3 mb-3">
                  <button className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg font-medium">
                    Upload New
                  </button>

                  <button className="border border-gray-300 hover:bg-gray-100 transition text-gray-700 px-5 py-2 rounded-lg font-medium">
                    Remove
                  </button>
                </div>

                <p className="text-sm text-gray-400">JPG, PNG. Max size 2MB</p>
              </div>
            </div>
          </div>

          <div className="py-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="(+20) 10-0123-4567"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Date of Birth
                </label>

                <div className="relative">
                  <input
                    type="date"
                    placeholder="05/15/1990"
                    className="w-full  border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Cancel
            </button>

            <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium">
              Update Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
