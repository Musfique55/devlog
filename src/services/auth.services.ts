"use server";

import { envVars } from "@/env";
import { deleteCookie } from "@/lib/cookieUtils";
import fetchWithAuthServer, { getCookieHeader } from "@/lib/fetchWithAuth";
import { setTokenInCookie } from "@/lib/tokenUtils";

export const getNewRefreshToken = async (): Promise<{
  message: string;
  success: boolean;
  data: null | {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
  };
}> => {
  try {
    const res = await fetchWithAuthServer(`${envVars.AUTH_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: res.statusText,
      };
    }

    const result = await res!.json();

    if (!result.success) {
      return {
        success: false,
        data: null,
        message: result.message,
      };
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken,
    } = result.data;

    if (accessToken) {
      await setTokenInCookie("accessToken", accessToken, 15 * 60);
    }

    if (newRefreshToken) {
      await setTokenInCookie("refreshToken", newRefreshToken, 24 * 60 * 60 * 7);
    }

    if (sessionToken) {
      await setTokenInCookie(
        "better-auth.session_token",
        sessionToken,
        24 * 60 * 60 * 7,
      ); //7 day
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getUserInfo = async () => {
  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      data: result.data,
      message: result.message,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const logout = async () => {
  try {
    await fetchWithAuthServer(`${envVars.AUTH_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("better-auth.session_token");
    deleteCookie("__Secure-better-auth.session_token");
    deleteCookie("__Secure-better-auth.session_data");
    return {
      success: true,
      message: "Logged out successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteAccount = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.AUTH_URL}/users/delete-account`,
      {
        method: "DELETE",
      },
    );

    if (res && !res.ok) {
      return {
        success: false,
        message: res.statusText,
      };
    }

    const result = await res!.json();
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: result.message,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
