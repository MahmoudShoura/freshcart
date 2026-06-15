"use client";

import ChangePassword from "@/components/changePassword/ChangePassword";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";
import { useAppSelector } from "@/store/store";
import {
  faCamera,
  faCheckCircle,
  faLocationDot,
  faShieldHalved,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const AVATAR_STORAGE_KEY = "freshcart-profile-avatar";
const PROFILE_PREFERENCES_KEY = "freshcart-profile-preferences";
const MAX_AVATAR_SIZE_MB = 2;

type ProfilePreferences = {
  displayName: string;
  familyName: string;
  phoneNumber: string;
  city: string;
  visibility: {
    city: boolean;
  };
};

function getInitialAvatar() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(AVATAR_STORAGE_KEY);
}

function createDefaultPreferences(displayName: string): ProfilePreferences {
  return {
    displayName,
    familyName: "",
    phoneNumber: "",
    city: "",
    visibility: {
      city: false,
    },
  };
}

function getInitialPreferences(displayName: string): ProfilePreferences {
  const defaultPreferences = createDefaultPreferences(displayName);

  if (typeof window === "undefined") return defaultPreferences;

  const savedPreferences = localStorage.getItem(PROFILE_PREFERENCES_KEY);

  if (!savedPreferences) return defaultPreferences;

  try {
    const parsedPreferences = JSON.parse(
      savedPreferences,
    ) as Partial<ProfilePreferences>;

    return {
      ...defaultPreferences,
      ...parsedPreferences,
      visibility: {
        ...defaultPreferences.visibility,
        city:
          typeof parsedPreferences.visibility?.city === "boolean"
            ? parsedPreferences.visibility.city
            : defaultPreferences.visibility.city,
      },
    };
  } catch {
    localStorage.removeItem(PROFILE_PREFERENCES_KEY);
    return defaultPreferences;
  }
}

export default function AccountScreen() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  const t = translations[language];
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    getInitialAvatar,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const baseDisplayName = userInfo?.name || "FreshCart User";
  const [profilePreferences, setProfilePreferences] =
    useState<ProfilePreferences>(() => getInitialPreferences(baseDisplayName));
  const displayName = profilePreferences.displayName || baseDisplayName;
  const userRole = userInfo?.role || "user";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "U";

  const visibleHeroFields = [
    profilePreferences.visibility.city && profilePreferences.city
      ? {
          icon: faLocationDot,
          label: profilePreferences.city,
        }
      : null,
  ].filter(Boolean) as { icon: typeof faLocationDot; label: string }[];

  function updatePreferenceField(
    field: keyof Omit<ProfilePreferences, "visibility">,
    value: string,
  ) {
    setProfilePreferences((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updatePreferenceVisibility(
    field: keyof ProfilePreferences["visibility"],
    value: boolean,
  ) {
    setProfilePreferences((current) => ({
      ...current,
      visibility: {
        ...current.visibility,
        [field]: value,
      },
    }));
  }

  function handleSavePreferences() {
    const nextDisplayName = profilePreferences.displayName.trim();

    if (!nextDisplayName) {
      toast.error(t.displayNameRequired);
      return;
    }

    const preferencesToSave: ProfilePreferences = {
      ...profilePreferences,
      displayName: nextDisplayName,
      familyName: profilePreferences.familyName.trim(),
      phoneNumber: profilePreferences.phoneNumber.trim(),
      city: profilePreferences.city.trim(),
    };

    setProfilePreferences(preferencesToSave);
    localStorage.setItem(
      PROFILE_PREFERENCES_KEY,
      JSON.stringify(preferencesToSave),
    );
    toast.success(t.profilePreferencesSaved);
  }

  function handleResetPreferences() {
    const defaultPreferences = createDefaultPreferences(baseDisplayName);

    setProfilePreferences(defaultPreferences);
    localStorage.removeItem(PROFILE_PREFERENCES_KEY);
    toast.success(t.profilePreferencesReset);
  }

  function clearAvatarInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) return;

    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      clearAvatarInput();
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      setAvatarPreview(reader.result);
      localStorage.setItem(AVATAR_STORAGE_KEY, reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveAvatar() {
    setAvatarPreview(null);
    localStorage.removeItem(AVATAR_STORAGE_KEY);
    clearAvatarInput();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.myAccount}</h1>
          <p className="text-gray-500 mt-2">{t.accountSubtitle}</p>
        </div>

        <span className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 border border-green-100">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
          {t.activeAccount}
        </span>
      </div>

      <main className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="shrink-0 flex flex-col items-center md:items-start">
                <div className="w-32 h-32 rounded-full bg-white text-primary-600 flex items-center justify-center text-5xl font-bold shadow-2xl ring-4 ring-white/70 ring-offset-4 ring-offset-primary-700 overflow-hidden transition duration-300 ease-out hover:ring-6 hover:ring-white hover:ring-offset-primary-800">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile avatar"
                      width={128}
                      height={128}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    avatarLetter
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1 text-center md:text-start">
                <h2 className="text-3xl font-bold truncate">{displayName}</h2>
                <p className="text-primary-100 mt-2 text-base">
                  {t.accountDashboardSubtitlePrefix}{" "}
                  <span dir="ltr" className="inline-block">
                    FreshCart
                  </span>
                  {t.accountDashboardSubtitleSuffix
                    ? ` ${t.accountDashboardSubtitleSuffix}`
                    : ""}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start rtl:md:justify-end gap-3 mt-5 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 capitalize">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    {userRole}
                  </span>

                  {visibleHeroFields.map((field) => (
                    <span
                      key={`${field.icon.iconName}-${field.label}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5"
                    >
                      <FontAwesomeIcon icon={field.icon} />
                      {field.label}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap justify-center md:justify-start rtl:md:justify-end gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition shadow-sm">
                    <FontAwesomeIcon icon={faCamera} />
                    {t.changePhoto}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>

                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      {t.removePhoto}
                    </button>
                  )}
                </div>

                {avatarPreview && (
                  <p className="mt-3 text-xs font-medium text-primary-100">
                    {t.savedOnDevice}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {t.profilePreferences}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t.profilePreferencesSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.displayName}
              </label>
              <input
                type="text"
                value={profilePreferences.displayName}
                onChange={(event) =>
                  updatePreferenceField("displayName", event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.familyName}
              </label>
              <input
                type="text"
                value={profilePreferences.familyName}
                onChange={(event) =>
                  updatePreferenceField("familyName", event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                dir="ltr"
                value={profilePreferences.phoneNumber}
                onChange={(event) =>
                  updatePreferenceField("phoneNumber", event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  {t.city}
                </label>

                <label className="inline-flex items-center gap-2 text-xs text-gray-500">
                  <span>{t.showInHeader}</span>
                  <input
                    type="checkbox"
                    checked={profilePreferences.visibility.city}
                    onChange={(event) =>
                      updatePreferenceVisibility("city", event.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <span className="relative h-5 w-9 rounded-full bg-gray-200 transition peer-checked:bg-primary-600 after:absolute after:start-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4"></span>
                </label>
              </div>

              <input
                type="text"
                value={profilePreferences.city}
                onChange={(event) =>
                  updatePreferenceField("city", event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            {t.preferencesPrivacyNote}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={handleResetPreferences}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              {t.reset}
            </button>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition font-medium"
            >
              {t.savePreferences}
            </button>
          </div>
        </div>

        <div id="security-settings" className="scroll-mt-24 pt-1">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-100">
              <FontAwesomeIcon icon={faShieldHalved} className="w-4" />
            </span>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {t.securitySettings}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t.securitySettingsSubtitle}
              </p>
            </div>
          </div>
          <ChangePassword />
        </div>
      </main>
    </div>
  );
}
