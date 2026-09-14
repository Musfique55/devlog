"use server";

import { envVars } from "@/env";
import fetchWithAuthServer from "@/lib/fetchWithAuth";

export const getStats = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/admin/dashboard`,
    );
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getProfitStats = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/admin/dashboard/yearly-profit`,
    );
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getUserGrowthStats = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/admin/dashboard/user-growth`,
    );
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getUsers = async (query: { [key: string]: string }) => {
  try {
    const url = new URL(`${envVars.API_URL}/admin/users`);
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key]),
    );

    const res = await fetchWithAuthServer(url.toString());
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
      meta: result.meta,
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

export const updateUserStatus = async (
  userId: string,
  payload: Record<string, boolean>,
) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      return {
        data: {
          success: false,
          message: res.statusText,
        },
      };
    }

    const result = await res.json();
    if (!result.success) {
      return {
        data: {
          success: false,
          message: result.message,
        },
      };
    }
    return {
      data: {
        success: true,
        message: result.message,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      data: {
        success: false,
        message: error.message,
      },
    };
  }
};

export const getWorkspaces = async (filter?: string) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/admin/workspaces/${filter ? `?${filter}` : ""}`,
    );
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
      meta  : result.meta,
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
