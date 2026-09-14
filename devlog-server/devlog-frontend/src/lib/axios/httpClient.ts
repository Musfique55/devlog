"use server"
import { envVars } from "@/env";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { isTokenExpiringSoon } from "../tokenUtils";
import { getNewRefreshToken } from "@/services/auth.services";

const tryRefreshToken = async (
  accessToken: string,
): Promise<void> => {
  if (!isTokenExpiringSoon(accessToken)) {
    return;
  }

  const requestHeaders = await headers();

  if (requestHeaders.get("x-refreshed-token") === "1") {
    return; //avoid multiple refresh attempt in same request lifecycle
  }

  try {
    await getNewRefreshToken();
  } catch (error) {
    console.error("Error refreshing token in http client:", error);
  }
};

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken);
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: envVars.API_URL,
    timeout : 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  return instance;
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get(endpoint, {
      params: options?.params,
      headers: options?.headers,
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpPost = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpPut = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpPatch = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpDelete = async (endpoint: string, options?: ApiRequestOptions) => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


