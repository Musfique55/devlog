"use server";

import { envVars } from "../../../env";
import { authValidator } from "@/zod/authValidator";
import { setTokenInCookie } from "@/lib/tokenUtils";

export const createAccount = async (payload: {
  name: string;
  email: string;
  password: string;
  inviteToken?: string;
}) => {
  const parsedPayload = authValidator.register.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "invalid input";
    return {
      success: false,
      error: firstError,
    };
  }

  try {
    const res = await fetch(`${envVars.AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        error: result.message,
      };
    }

    await setTokenInCookie("accessToken", result.data.accessToken, 15 * 60);
    await setTokenInCookie(
      "refreshToken",
      result.data.refreshToken,
      24 * 60 * 60 * 7,
    );
    await setTokenInCookie(
      "better-auth.session_token",
      result.data.token,
      24 * 60 * 60 * 7,
    ); //7 days

    return {
      success: true,
      data: result,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const login = async (
  payload: { email: string; password: string },
  intendedRedirect?: string | null,
) => {
  const parsedPayload = authValidator.login.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "invalid input";
    return {
      success: false,
      error: firstError,
    };
  }

  let role;

  try {
    const res = await fetch(`${envVars.AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        error: result.message,
      };
    }

    role = result.data.user.role;

    await setTokenInCookie("accessToken", result.data.accessToken, 15 * 60);
    await setTokenInCookie(
      "refreshToken",
      result.data.refreshToken,
      24 * 60 * 60 * 7,
    );
    await setTokenInCookie(
      "better-auth.session_token",
      result.data.token,
      24 * 60 * 60 * 7,
    ); //7 days

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }

  let redirectUrl = "/dashboard";
  if (intendedRedirect) {
    redirectUrl = intendedRedirect;
  } else if (role === "SUPER_ADMIN") {
    redirectUrl = "/admin/dashboard";
  }

  return {
    success: true,
    redirectUrl,
  };
};
