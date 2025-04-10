type Layer = 1 | 2 | 3;

export type InputBaseProps = {
  layer?: Layer;
  isError?: boolean;
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputFieldBaseProps = {
  layer?: Layer;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputFieldProps = InputFieldBaseProps & {
  label?: React.ReactNode;
  error?: string;
  isSimple?: boolean;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export type SearchBar = {
  layer?: Layer;
  variant?: "small" | "medium" | "large";
} & React.HTMLProps<HTMLInputElement>;

export type TextArea = {
  label?: string;
  layer?: Layer;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type ListItemInput = {
  onDelete: () => void;
} & InputFieldProps;
