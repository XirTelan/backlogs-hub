export type InputField = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type ListItemInput = {
  onDelete: () => void;
} & InputField;
