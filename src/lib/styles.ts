export const btnStyleVariants = {
  heights: {
    small: "h-8",
    medium: "h-10",
    large: "h-12",
    elarge: "h-16",
  },
  sizes: {
    small: "w-8  min-w-8",
    medium: "w-10  min-w-10",
    large: "w-12 min-w-12",
    elarge: "w-12 min-w-12",
  },
  colors: {
    primary: "bg-primary-btn hover:bg-primary-btn-hover text-white ",
    secondary: "bg-secondary-btn hover:bg-secondary-btn-hover text-white",
    accent: "bg-green-800 hover:bg-green-700",
    tertiary:
      "outline text-white  hover:text-inverse outline-1 -outline-offset-2 outline-white hover:bg-tertiary-btn-hover",
    ghost: "text-primary-link hover:bg-subtle-3/15",
    ghostAccent: " text-green-500 hover:text-green-400 hover:bg-subtle-3/15 ",
    dangerPrimary: "bg-danger-btn hover:bg-danger-btn-hover text-white",
    dangerTertiary: "  ",
    dangerGhost:
      "text-danger-text hover:bg-danger-btn-hover hover:text-white disabled:bg-transparent",
  },
};

export const inputStyleVariants = {
  helperType: {
    text: " text-subtle-3",
    error: " text-error-text",
  },
  sizes: {
    small: "h-8 px-4 py-[7px] ",
    medium: "h-10 px-4 py-[11px] ",
    large: "h-12 p-4",
  },
  layers: {
    1: "bg-field-1 border-strong-1 ",
    2: "bg-field-2 border-strong-2",
    3: "bg-field-3 border-strong-3",
  },
};
