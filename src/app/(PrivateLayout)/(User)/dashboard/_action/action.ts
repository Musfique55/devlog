"use server";

import { envVars } from "@/env";
import { cookies } from "next/headers";

export const handleProfileUpdate = async (formData: FormData) => {
  const cookieStore = (await cookies()).getAll();
  const cookieHeaders = cookieStore
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const res = await fetch(`${envVars.AUTH_URL}/update-profile`, {
      method: "PATCH",
      body: formData,
      headers: {
        Cookie: cookieHeaders,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update profile!",
      data: null,
    };
  }
};
