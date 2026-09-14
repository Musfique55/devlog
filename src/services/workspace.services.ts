"use server";

import { envVars } from "@/env";
import fetchWithAuthServer from "@/lib/fetchWithAuth";

export const getWorkspace = async (workspaceId: string) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/workspaces/${workspaceId}`,
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

export const getWorkspacesByUser = async () => {
  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/workspaces/me`);

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
      message: result.message,
      success: true,
      data: result.data,
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

export const getWorkspaceMembers = async (
  workspaceId: string,
  query?: Record<string, string>,
) => {
  try {
    const url = new URL(`${envVars.API_URL}/workspaces/${workspaceId}/members`);
    if (query) {
      url.search = new URLSearchParams(query).toString();
    }
    const res = await fetchWithAuthServer(`${url}`);
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

export const getUsersOverallWorkspaceStats = async () => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/workspaces/me/stats`,
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
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getWorkspaceStats = async (id: string) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/workspaces/${id}/stats`,
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

export const createWorkspace = async (payload: {
  name: string;
  adminId: string;
}) => {
  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/workspaces`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
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
        message: res.statusText,
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
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const inviteUserToWorkspace = async (payload: {
  email: string;
  workspaceId: string;
}) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/workspaces/${payload.workspaceId}/invite`,
      {
        method: "POST",
        body: JSON.stringify({ email: payload.email }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await res.json();

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

export const verifyTeamLink = async (link: string) => {
  const token = link.split("?token=")[1];
  const res = await fetchWithAuthServer(
    `${envVars.API_URL}/invites/accept/${token}`,
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || res.statusText || "Failed to accept invitation",
    );
  }
  const result = await res.json();
  return {
    success: result.success,
    message: result.message,
  };
};

export const removeMemberFromWorkspace = async (
  workspaceId: string,
  memberId: string,
) => {
  try {
    const res = await fetchWithAuthServer(
      `${envVars.API_URL}/workspaces/${workspaceId}/remove-member`,
      {
        method: "DELETE",
        body: JSON.stringify({ memberId }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      if (res.status === 404) {
        return {
          success: false,
          message: "Member not found",
        };
      } else if (res.status === 400) {
        return {
          success: false,
          message: "Admin cannot remove himself",
        };
      }
    }

    const result = await res.json();

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
    return {
      success: false,
      message: error.message,
    };
  }
};
