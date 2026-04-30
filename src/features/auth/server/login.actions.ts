"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginFormValues, loginSchema } from "./../schemas/login.schema";
export default async function loginAction(values: LoginFormValues) {
  const validationResult = loginSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {}; // ^{name:"", password:""}

    validationResult.error.issues.forEach((issue) => {
      // & issues=>{path:['name], message:""}
      const key = issue.path[0] as string; // *'password'
      const message = issue.message; // *'password is required'

      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "validation errors",
      errors,
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rememberMe, ...requestData } = values;

    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: requestData,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "user logged in successfully",
        data,
      };
    }

    return {
      success: false,
      message: "login failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMassage = error.response?.data.message;
      if (errorMassage === "Incorrect email or password") {
        return {
          success: false,
          message: "wrong credentials",
          errors: {
            password: "Incorrect email or password",
          },
        };
      }
    }

    return {
      success: false,
      message: "login failed",
    };
  }
}
