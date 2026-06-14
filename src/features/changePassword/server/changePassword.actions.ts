"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export async function changePasswordAction(values: {
  currentPassword: string;
  password: string;
  rePassword: string;
}): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      method: "PUT",
      headers: {
        token,
      },
      data: values,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return { success: true, message: "Password updated successfully" };
    }

    return {
      success: false,
      message: data.message || "Failed to change password",
    };
  } catch (error: unknown) {
    const errorMessage = axios.isAxiosError<{ message?: string }>(error)
      ? error.response?.data?.message
      : undefined;

    return {
      success: false,
      message: errorMessage || "Something went wrong",
    };
  }
}
