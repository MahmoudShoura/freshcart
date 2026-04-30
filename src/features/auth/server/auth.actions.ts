"use server";

import { AuthState } from "@/store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();

  if (rememberMe) {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
    });
  } else {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60,
    });
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null; // from cookie store you will have => an object {name, value}
  return token;
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifytoken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    if (data.message === "verified") {
      const { name, id, role } = data.decoded;
      return {
        isAuthenticated: true,
        userInfo: {
          name,
          id,
          role,
        },
      };
    }

    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}

