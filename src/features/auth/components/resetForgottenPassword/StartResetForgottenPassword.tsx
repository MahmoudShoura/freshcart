"use client";
import {
  faEnvelope,
  
  faPaperPlane,
  faShieldAlt,
  
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function StartResetForgottenPassword() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Step 1: Attempting plural endpoint /forgotPasswords with:", email);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      
      console.log("Response from /forgotPasswords:", response.data);

      if (response.data.statusMsg === "success" || response.data.status === "Success" || response.data.message === "success") {
        toast.success(response.data.message || "OTP sent to your email");
        setStep("otp");
      } else {
       
        const msg = response.data.message || "Failed to send reset code";
        toast.error(msg);
        if (msg.includes("email")) {
         
        }
      }
    } catch (error: unknown) {
      const axiosError = axios.isAxiosError<{ message?: string }>(error)
        ? error
        : null;

      console.error("Forgot password error info:", {
        status: axiosError?.response?.status,
        data: axiosError?.response?.data,
        message: axiosError?.message
      });

      const Messagefromserver = axiosError?.response?.data?.message;
      
     
      if (axiosError?.response?.status === 404 || !Messagefromserver) {
        try {
          
          const fallbackRes = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPassword",
            { email }
          );
          if (fallbackRes.data.statusMsg === "success" || fallbackRes.data.message === "success") {
            toast.success("OTP sent to your email");
            setStep("otp");
            return;
          }
        } catch (fallbackError) {
          
        }
      }

      const finalMsg = Messagefromserver || axiosError?.message || "Something went wrong";
      toast.error(finalMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP code");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Verifying OTP:", otp);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: otp },
      );
      
      console.log("Verification Response:", data);

      if (data.status === "Success" || data.statusMsg === "success" || data.message === "success") {
        toast.success("OTP verified successfully");
        router.push(`/reset-forgotten-password?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error: unknown) {
      console.error("OTP verification error:", error);
      const errorMessage = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || error.message
        : "Invalid OTP";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-primary-600">
                Fresh<span className="text-gray-800">Cart</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === "email" ? "Forgot your password?" : "Verify OTP"}
            </h2>
            <p className="text-gray-600">
              {step === "email"
                ? "No worries! Enter your email address and we'll send you a code to reset your password."
                : "Please enter the 6-digit code sent to your email address."}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendResetEmail}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-control px-4 w-full pl-12"
                    required
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full bg-primary-600 text-white 
                 hover:bg-primary-700 font-medium shadow-lg hover:shadow-xl 
                 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    Send Reset Code
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="form-control px-4 w-full pl-12"
                    required
                  />
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full bg-primary-600 text-white 
                 hover:bg-primary-700 font-medium shadow-lg hover:shadow-xl 
                 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                    Verify Code
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
              >
                Back to Email
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Remember your password?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer ms-2"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
