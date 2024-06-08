export const routesList = {
  backlogCreate: "/backlog/create",
  backlogEdit: "/backlog/edit",
  templates: "/templates",
  itemsCreate: "/items/create",
  itemsEdit: "/items/edit",
  settings: "/settings",
  register: "/register",
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
