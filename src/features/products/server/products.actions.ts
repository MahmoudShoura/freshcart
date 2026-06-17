"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  ProductsResponse,
  SingleProductResponse,
} from "./../types/Products.types";

const SEARCH_PRODUCTS_LIMIT = 50;
const SEARCH_PRODUCTS_MAX_PAGES = 2;

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsForSearch(): Promise<ProductsResponse> {
  try {
    const allProducts: ProductsResponse["data"] = [];
    let currentPage = 1;
    let latestResponse: ProductsResponse | null = null;

    while (currentPage <= SEARCH_PRODUCTS_MAX_PAGES) {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=${SEARCH_PRODUCTS_LIMIT}`,
        method: "GET",
      };

      const { data } = await axios.request<ProductsResponse>(options);
      latestResponse = data;
      allProducts.push(...data.data);

      if (!data.metadata.nextPage) {
        break;
      }

      currentPage = data.metadata.nextPage;
    }

    if (!latestResponse) {
      return {
        results: 0,
        metadata: {
          currentPage: 1,
          nameOfPages: 1,
          limit: SEARCH_PRODUCTS_LIMIT,
        },
        data: [],
      };
    }

    return {
      ...latestResponse,
      data: allProducts,
    };
  } catch (error) {
    throw error;
  }
}

export async function getProductById({
  id,
}: {
  id: string;
}): Promise<SingleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };

    console.log(options);

    const { data } = await axios.request(options);

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByBrand({
  brandId,
}: {
  brandId: string;
}): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategory({
  categoryId,
}: {
  categoryId: string;
}): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsBySubCategory({
  subcategoryId,
}: {
  subcategoryId: string;
}): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
