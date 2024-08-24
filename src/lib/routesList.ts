export const routesList = {
  backlogCreate: "/backlog/create",
  backlogEdit: "/backlog/edit",
  itemsCreate: "/items/create",
  itemsEdit: "/items/edit",
  manageBacklogs: "/manage-backlogs",
  templates: "/templates",
  settings: "/settings",
  register: "/register",
  faq: "/faq",
  faqFields: "/faq/fields",
  faqModifiers: "/faq/modifiers",
  updates: "/updates",
  contacts: "/contacts",
};
export const apiRoutesList = {
  auth: "/api/auth",
  signIn: "/api/auth/signIn",
  register: "/api/auth/register",
  templates: "/api/templates",
  items: "/api/items",
};
export const routesCategories = {
  protectedRoutes: [
    routesList.backlogCreate,
    routesList.backlogEdit,
    routesList.templates,
    routesList.itemsCreate,
    routesList.itemsEdit,
    routesList.settings,
    routesList.manageBacklogs,
  ],
  forNonUser: ["/", routesList.register],
};
