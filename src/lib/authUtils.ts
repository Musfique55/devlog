export type UserRole = "SUPER_ADMIN" | "USER";
export type WorkspaceRole = "ADMIN" | "MEMBER";


interface RoutesConfig {
  exact: string[];
  pattern: RegExp[];
}

export const authRoutes = [ "/auth/login", "/auth/register", "/forgot-password", "/reset-password",];

export const proUserRoutes = ["/workspace/:id/create-workspace","/workspace/:id/invite-member","/workspace/:id/weekly-report"];

const isRouteMatches = (pathname: string, routes: RoutesConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.pattern.some((pattern) => pattern.test(pathname));
};

const commonPrivateRoute: RoutesConfig = {
  exact: ["/my-profile", "/settings", "/payment"],
  pattern: [],
};

const adminRoutes: RoutesConfig = {
  pattern: [/^\/admin\//],
  exact: [],
};

const workSpaceRoutes: RoutesConfig = {
  pattern: [/^\/workspace\//],
  exact: ['/workspace'],
};

const soloUserRoutes: RoutesConfig = {
  exact: ["/dashboard", "/payment/success", "/payment/failed"],
  pattern: [/^\/logs/, /^\/calendar/,/^\/dashboard\//] 
};

export const isAuthRoute = (pathname: string) : boolean => {
    return authRoutes.includes(pathname);
}

export const getRoutesOwner = (pathname: string) => {
  if (isRouteMatches(pathname, commonPrivateRoute)) {
    return "COMMON";
  }

  if (isRouteMatches(pathname, adminRoutes)) {
    return "SUPER_ADMIN";
  }

  if (isRouteMatches(pathname, workSpaceRoutes)) {
    return "WORKSPACE";
  }

  if (isRouteMatches(pathname, soloUserRoutes)) {
    return "USER";
  }

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === "SUPER_ADMIN") {
    return "/admin/dashboard";
  }

  return "/dashboard";
};

export const isValidRedirectForRole = (pathname: string) => {
  const routeOwner = getRoutesOwner(pathname);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === "SUPER_ADMIN") {
    return true;
  }

  if (routeOwner === "WORKSPACE") {
    return true;
  }

  if (routeOwner === "USER") {
    return true;
  }

  return false;
};
