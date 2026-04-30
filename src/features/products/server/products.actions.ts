"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  ProductsResponse,
  SingleProductResponse,
} from "./../types/Products.types";

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