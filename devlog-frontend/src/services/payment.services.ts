"use server";

import { envVars } from "@/env";
import fetchWithAuthServer from "@/lib/fetchWithAuth";

export const getInvoices = async () => {
  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/payments`);
    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
        success: false,
        data: null,
      };
    }

    return {
      message: data.message,
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const cancelSubscription = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/payments/cancel-subscription`,
      {
        method: "PATCH",
      },
    );

    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
        success: false,
        data: null,
      };
    }

    return {
      message: data.message,
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
  }
};
