export const routesList = {
  backlogCreate: "/backlog/create",
  backlogEdit: "/backlog/edit",
  itemsCreate: "/items/create",
  itemsEdit: "/items/edit",
  manageBacklogs: "/manage-backlogs",
  templates: "/templates",
  settings: "/settings",
  register: "/register",
};
export const apiRoutesList = {
  auth: "/api/auth",
  signIn: "/api/auth/signIn",
  register: "/api/auth/register",
  templates: "/api/templates",
};
export const routesCategories = {
  protectedRoutes: [
    routesList.backlogCreate,
    routesList.backlogEdit,
    routesList.templates,
    routesList.itemsCreate,
    routesList.itemsEdit,
    routesList.settings,
  ],
  forNonUser: ["/", routesList.register],
};

export const sizes = {
  small: "h-8",
  medium: "h-10",
  large: "h-12",
  elarge: "h-16",
};
export const buttonSize = {
  small: "w-8  min-w-8",
  medium: "w-10  min-w-10",
  large: "w-12 min-w-12",
  elarge: "w-12 min-w-12",
};

export const buttonColorVariants = {
  primary: "bg-primary-btn hover:bg-primary-btn-hover text-white ",
  secondary: "bg-secondary-btn hover:bg-secondary-btn-hover text-white",
  accent: "bg-green-800 hover:bg-green-700",
  tertiary:
    "outline text-white  hover:text-inverse outline-1 -outline-offset-2 outline-white hover:bg-tertiary-btn-hover",
  ghost: "text-primary-link hover:bg-subtle-3/15",
  ghostAccent: " text-green-800 hover:text-green-700 ",
  dangerPrimary: "bg-danger-btn hover:bg-danger-btn-hover text-white",
  dangerTertiary: "  ",
  dangerGhost:
    "text-danger-text hover:bg-danger-btn-hover hover:text-white disabled:bg-transparent",
};
