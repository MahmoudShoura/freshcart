"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse } from "../types/cart.types";

export async function addProductToCart({ productId }: { productId: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authenication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authenication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromCart(
  productId: string,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authenication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "DELETE",
      headers: { token },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductQuantity(
  productId: string,
  count: number,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authenication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "PUT",
      headers: { token },
      data: { count },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function mergeGuestCartAfterLogin(
  items: { productId: string; quantity: number }[],
) {
  const currentCart = await getLoggedUserCart();
  const existingCounts = new Map(
    currentCart.data.products.map((item) => [item.product.id, item.count]),
  );

  for (const item of items) {
    const quantity = Math.max(1, item.quantity);
    const existingCount = existingCounts.get(item.productId) || 0;
    const nextCount = existingCount + quantity;

    if (existingCount === 0) {
      await addProductToCart({
        productId: item.productId,
      });
    }

    if (nextCount > 1) {
      await updateProductQuantity(item.productId, nextCount);
    }
  }

  return await getLoggedUserCart();
}

export async function clearLoggedUserCart(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    await axios.request({
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "DELETE",
      headers: {
        token,
      },
    });
  } catch (error) {
    throw error;
  }
}
