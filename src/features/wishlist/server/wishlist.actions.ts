"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { WishlistProduct } from "../types/wishlist.types";

export async function getWishlist(): Promise<WishlistProduct[]> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("You must login first.");
  }

  const config: AxiosRequestConfig = {
    url: "https://ecommerce.routemisr.com/api/v1/wishlist",
    method: "GET",
    headers: {
      token,
    },
  };

  const response = await axios(config);

  return response.data.data;
}

export async function removeFromWishlist(
  productId: string
): Promise<WishlistProduct[]> {
  const token = (await cookies()).get("token")?.value;

  const config: AxiosRequestConfig = {
    url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    method: "DELETE",
    headers: {
      token: token || "",
    },
  };

  const response = await axios(config);

  return response.data.data;
}

export async function addToWishlist(
  productId: string
): Promise<WishlistProduct[]> {
  const token = (await cookies()).get("token")?.value;

  const config: AxiosRequestConfig = {
    url: "https://ecommerce.routemisr.com/api/v1/wishlist",
    method: "POST",
    headers: {
      token: token || "",
    },
    data: {
      productId,
    },
  };

  const response = await axios(config);

  return response.data.data;
}
