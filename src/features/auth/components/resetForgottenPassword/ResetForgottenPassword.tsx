"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetForgottenPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.warning("No email found. Please start the forgot password process again.");
      router.push("/forgotten-password");
    }
  }, [email, router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );

      toast.success("Password reset successfully. Please login with your new password.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
            <FontAwesomeIcon icon={faLock} className="text-green-600 text-xl" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Reset Password
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your new password below for <span className="font-medium text-gray-700">{email}</span>
          </p>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <FontAwesomeIcon icon={showNewPassword ? faShieldAlt : faEye} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full text-sm text-gray-500 hover:text-green-600 transition text-center"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
