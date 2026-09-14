"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../env";
import { setCookie } from "./cookieUtils";

const getRemainingSeconds = (token: string) => {
  try {
    const payload = envVars.JWT_SECRET_KEY
      ? (jwt.verify(token, envVars.JWT_SECRET_KEY) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);
    if (payload && !payload.exp) {
      return 0;
    }

    const remainingSeconds =
      (payload.exp as number) - Math.floor(Date.now() / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const setTokenInCookie = async (
  name: string,
  token: string,
  maxAgeInSeconds: number,
) => {
  await setCookie(name, token, maxAgeInSeconds);
};

export const isTokenExpiringSoon = async (token: string, threshold = 300) => {
  const remainingSeconds = getRemainingSeconds(token);

  return remainingSeconds > 0 && remainingSeconds <= threshold;
};

export const isTokenExpired = async (token: string) => {
  const remainingSeconds = getRemainingSeconds(token);

  return remainingSeconds === 0;
};
