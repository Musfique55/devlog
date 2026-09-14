"use server";

import { StandupData } from "@/components/modules/(user)/dashboard/standup-form";
import { WorkspaceLogResponse } from "@/components/modules/(workspace)/admin-dashboard/dashboard-wrapper";
import { envVars } from "@/env";
import fetchWithAuthServer from "@/lib/fetchWithAuth";

export interface Log {
  id: string;
  workspaceId: string | null;
  user : {
    id : string,
    name : string,
    image : string | null
  };
  todayWork: string;
  tomorrowWork: string;
  blocker: string;
  blockerUrl: string[];
  blockerStatus: string;
  blockerResolvedAt: string | null;
  blockerResolvedBy: string | null;
  projectTags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface LogPayload {
  todayWork : string
  tomorrowWork : string
  blocker? : string
  projectTags : string[]
}


export const createLog = async (payload: LogPayload) => {

  const data = Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== ""),
  );

  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res!.json();

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
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};

export const getMyLogs = async (
  query: Record<string, string>,
) => {
  try {
    const url = new URL(`${envVars.API_URL}/logs`);
    url.search = new URLSearchParams(query).toString();

    const res = await fetchWithAuthServer(`${url}`);

    if (res && !res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res!.json();

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
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const deleteLog = async (id: string) => {
  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/logs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateLog = async (id: string, payload: Partial<StandupData>) => {

  try {
    const res = await fetchWithAuthServer(`${envVars.API_URL}/logs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res && !res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res!.json();

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
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};

export const getWorkspaceLogs = async (workspaceId: string) : Promise<WorkspaceLogResponse<Log>> => {
  try {
    const url = new URL(`${envVars.API_URL}/logs/workspaces/${workspaceId}`);
    const res = await fetchWithAuthServer(`${url}`);

    if (res && !res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }
    const result = await res!.json();

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
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};
