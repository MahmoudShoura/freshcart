"use server";

import axios, { AxiosRequestConfig } from "axios";
import { BrandsResponse } from "@/features/brands/types/Brands.types";

export async function getAllBrands(): Promise<BrandsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
