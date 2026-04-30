"use server";

import axios, { AxiosRequestConfig } from "axios";
import { SubcategoriesResponse } from "../types/subcategory.types";

export async function getAllSubCategories(): Promise<SubcategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/subcategories`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
