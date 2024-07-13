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
