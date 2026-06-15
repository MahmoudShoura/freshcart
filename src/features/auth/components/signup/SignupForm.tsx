"use client";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faSpinner,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormValues, signupSchema } from "../../schemas/signup.schema";
import signupAction from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordStrengthChecker from "@/utils/PasswordStrengthChecker";
import { useLanguage } from "@/context/language.context";
import { translations } from "@/context/translations";

const PROFILE_PREFERENCES_KEY = "freshcart-profile-preferences";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === "ar";

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signupFormValues>({
    defaultValues: {
      name: "",
      familyName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      city: "",
      terms: false,
    },

    resolver: zodResolver(signupSchema),

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit: SubmitHandler<signupFormValues> = async (values) => {
    try {
      const response = await signupAction(values);

      if (response?.success) {
        localStorage.setItem(
          PROFILE_PREFERENCES_KEY,
          JSON.stringify({
            displayName: values.name,
            familyName: values.familyName?.trim() || "",
            phoneNumber: values.phone,
            city: values.city?.trim() || "",
            visibility: {
              familyName: false,
              phoneNumber: false,
              city: false,
            },
          }),
        );

        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (response?.errors) {
          const errors = response.errors as Record<string, string>;

          Object.keys(errors).forEach((key) => {
            setError(key as keyof signupFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch {}
  };

  return (
    <div className="p-10 space-y-8 bg-white shadow-xl rounded-xl">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">{t.signupTitle}</h2>
        <p className="mt-1">{t.signupSubtitle}</p>
      </div>

      <div className=" flex gap-2 *:flex *:items-center *:justify-center *:w-full *:gap-2 *:hover:bg-gray-100">
        <button className="btn bg-transparent border border-gray-400/40">
          <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
          <span>Google</span>
        </button>

        <button className="btn bg-transparent border border-gray-400/40">
          <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
          <span>Facebook</span>
        </button>
      </div>

      <div className="relative w-full h-0.5 bg-gray-300/30">
        <span className="absolute bg-white px-4 start-1/2 top-1/2 -translate-1/2">
          {t.or}
        </span>
      </div>

      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="name flex flex-col gap-1">
          <label htmlFor="name">{t.name}</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Yassin"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 mt-0.5">*{errors.name.message}</p>
          )}
        </div>

        <div className="family-name flex flex-col gap-1">
          <label htmlFor="familyName">{t.familyName}</label>
          <input
            className="form-control"
            type="text"
            id="familyName"
            placeholder={t.optionalProfilePreference}
            {...register("familyName")}
          />
          {errors.familyName && (
            <p className="text-red-500 mt-0.5">
              *{errors.familyName.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {t.optionalProfileNote}
          </p>
        </div>

        <div className="email flex flex-col gap-1">
          <label htmlFor="email">{t.emailAddress}*</label>
          <input
            className="form-control text-left"
            type="email"
            id="email"
            placeholder="yassinshoura@gmail.com"
            dir="ltr"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 mt-0.5">*{errors.email.message}</p>
          )}
        </div>

        <div className="password flex flex-col gap-1">
          <label htmlFor="password">{t.password}*</label>
          <div className="relative" dir="ltr">
            <input
              className="form-control w-full ps-4 pe-14 text-left"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder={
                isArabic ? "أنشئ كلمة مرور قوية" : "Create a strong password"
              }
              dir="ltr"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon
                key={showPassword ? "open" : "closed"}
                icon={showPassword ? faEyeSlash : faEye}
                className="animate-eye"
              />
            </button>
          </div>

          <PasswordStrengthChecker password={passwordValue} showLabel={true} />

          {errors.password ? (
            <p className="text-red-500 mt-0.5">*{errors.password.message}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-2">
              {t.passwordHelp}
            </p>
          )}
        </div>

        <div className="repassword flex flex-col gap-1">
          <label htmlFor="repassword">{t.confirmPassword}</label>
          <div className="relative" dir="ltr">
            <input
              className="form-control w-full ps-4 pe-14 text-left"
              type={showConfirmPassword ? "text" : "password"}
              id="repassword"
              placeholder={
                isArabic ? "أكد كلمة المرور" : "Confirm your password"
              }
              dir="ltr"
              {...register("rePassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-red-500 mt-0.5">*{errors.rePassword.message}</p>
          )}
        </div>

        <div className="phone flex flex-col gap-1">
          <label htmlFor="phone">{t.phoneNumber}*</label>
          <input
            className="form-control text-left"
            type="tel"
            id="phone"
            placeholder="+2 010 9751 4862"
            dir="ltr"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-red-500 mt-0.5">*{errors.phone.message}</p>
          )}
        </div>

        <div className="city flex flex-col gap-1">
          <label htmlFor="city">{t.city}</label>
          <input
            className="form-control"
            type="text"
            id="city"
            placeholder={t.optionalProfilePreference}
            {...register("city")}
          />
          {errors.city && (
            <p className="text-red-500 mt-0.5">*{errors.city.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {t.optionalProfileNote}
          </p>
        </div>

        <div className="terms flex gap-2 items-center">
          <input
            type="checkbox"
            id="terms"
            className="accent-primary-600 size-4"
            {...register("terms")}
          />
          <label htmlFor="terms">
            {t.termsPrefix}{" "}
            <Link href="/terms" className="text-primary-600 underline">
              {t.termsOfService}{" "}
            </Link>{" "}
            {t.and}{" "}
            <Link href="/privacy-policy" className="text-primary-600 underline">
              {t.privacyPolicy}
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 mt-0.5">*{errors.terms.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn bg-primary-600 text-white 
        flex gap-2 items-center justify-center hover:bg-primary-700 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 
        w-full shadow-lg hover:shadow-xl "
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              <span>{t.creatingAccount}</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              <span>{t.createMyAccount}</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center pt-8 border-t border-gray-300/80">
        {t.alreadyHaveAccount}{" "}
        <Link href="/login" className="text-primary-600 underline">
          {t.signIn}
        </Link>{" "}
      </p>
    </div>
  );
}
