export const isRenderPagination = (position: string, pagination: string) => {
  return pagination == "both" || position == pagination;
};
