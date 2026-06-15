"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { changePasswordAction } from "@/features/changePassword/server/changePassword.actions";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";

export default function ChangePassword() {
  const { language } = useLanguage();
  const t = translations[language];
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !password || !rePassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== rePassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await changePasswordAction({
        currentPassword,
        password,
        rePassword,
      });

      if (result.success) {
        toast.success(result.message);
        setCurrentPassword("");
        setPassword("");
        setRePassword("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 p-10"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t.changePassword}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {t.changePasswordSubtitle}
          </p>

          <div className="space-y-6 py-8">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.currentPassword}
              </label>

              <div className="relative" dir="ltr">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 rounded-lg ps-4 pe-16 py-3 text-left focus:ring-2 focus:ring-green-500 focus:outline-none"
                  dir="ltr"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute end-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.newPassword}
              </label>

              <div className="relative" dir="ltr">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg ps-4 pe-16 py-3 text-left focus:ring-2 focus:ring-green-500 focus:outline-none"
                  dir="ltr"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute end-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.confirmNewPassword}
              </label>

              <div className="relative" dir="ltr">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg ps-4 pe-16 py-3 text-left focus:ring-2 focus:ring-green-500 focus:outline-none"
                  dir="ltr"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute end-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setCurrentPassword("");
                setPassword("");
                setRePassword("");
              }}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium disabled:bg-gray-400"
            >
              {isLoading ? t.updating : t.updatePassword}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
