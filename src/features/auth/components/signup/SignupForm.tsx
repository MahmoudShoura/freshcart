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

const PROFILE_PREFERENCES_KEY = "freshcart-profile-preferences";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <h2 className="text-3xl font-semibold">Create Your Account</h2>
        <p className="mt-1">Start your fresh journey with us today</p>
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
        <span className="absolute  bg-white px-4 left-1/2 top-1/2 -translate-1/2">
          or
        </span>
      </div>

      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="name flex flex-col gap-1">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="familyName">Family Name</label>
          <input
            className="form-control"
            type="text"
            id="familyName"
            placeholder="Optional profile preference"
            {...register("familyName")}
          />
          {errors.familyName && (
            <p className="text-red-500 mt-0.5">
              *{errors.familyName.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Optional. Saved locally for your account profile.
          </p>
        </div>

        <div className="email flex flex-col gap-1">
          <label htmlFor="email">Email*</label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="yassinshoura@gmail.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 mt-0.5">*{errors.email.message}</p>
          )}
        </div>

        <div className="password flex flex-col gap-1">
          <label htmlFor="password">Password*</label>
          <div className="relative">
            <input
              className="form-control w-full pl-4 pr-12"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="create a strong password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              Must be at least 8 characters with numbers and symbols
            </p>
          )}
        </div>

        <div className="repassword flex flex-col gap-1">
          <label htmlFor="repassword">Confirm Password</label>
          <div className="relative">
            <input
              className="form-control w-full pl-4 pr-12"
              type={showConfirmPassword ? "text" : "password"}
              id="repassword"
              placeholder="confirm your password"
              {...register("rePassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-red-500 mt-0.5">*{errors.rePassword.message}</p>
          )}
        </div>

        <div className="phone flex flex-col gap-1">
          <label htmlFor="phone">Phone*</label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            placeholder="+2 010 9751 4862"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-red-500 mt-0.5">*{errors.phone.message}</p>
          )}
        </div>

        <div className="city flex flex-col gap-1">
          <label htmlFor="city">City</label>
          <input
            className="form-control"
            type="text"
            id="city"
            placeholder="Optional profile preference"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-red-500 mt-0.5">*{errors.city.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Optional. Saved locally for your account profile.
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
            I agree to the{" "}
            <Link href="/terms" className="text-primary-600 underline">
              Terms of Service{" "}
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary-600 underline">
              Privacy Policy
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
              <span>Creating an account</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              <span>Create My Account</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center pt-8 border-t border-gray-300/80">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 underline">
          Sign In
        </Link>{" "}
      </p>
    </div>
  );
}
