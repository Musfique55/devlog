"use server";

import { getNewRefreshToken } from "@/services/auth.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookieHeader = `accessToken=${accessToken}; better-auth.session_token=${sessionToken}; refreshToken=${refreshToken}`;

  return cookieHeader;
};
const fetchWithAuthServer = async (url: string, options: RequestInit = {}) => {
  const cookieHeader = await getCookieHeader();

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) {
    const refreshToken = (await cookies()).get("refreshToken");
    if (!refreshToken) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
      (await cookies()).delete("better-auth.session_token");
      redirect("/auth/login");
    }
    await getNewRefreshToken();

    const updatedCookie = await getCookieHeader();

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Cookie: updatedCookie,
      },
    });
  }

  return res;
};

export default fetchWithAuthServer;
