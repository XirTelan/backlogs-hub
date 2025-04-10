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
    primary: "bg-btn-primary hover:bg-btn-primary-hover text-white ",
    secondary:
      "bg-btn-secondary hover:bg-btn-secondary-hover text-text-on-color ",
    accent: "bg-green-800 hover:bg-green-700",
    tertiary:
      "outline text-btn-tertiary   hover:text-text-inverse outline-1 -outline-offset-2 outline-btn-tertiary hover:bg-btn-tertiary-hover",
    ghost: "text-link-primary hover:bg-layer-1-hover",
    ghostAccent: " text-green-500 hover:text-green-400 hover:bg-layer-1-hover ",
    dangerPrimary: "bg-btn-danger-primary hover:bg-btn-danger-hover text-white",
    dangerTertiary: "  ",
    dangerGhost:
      "text-btn-danger-secondary hover:bg-btn-danger-hover hover:text-white disabled:bg-transparent",
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
    1: "bg-field-1 border-border-strong-1 ",
    2: "bg-field-2 border-border-strong-2",
    3: "bg-field-3 border-border-strong-3",
  },
};
