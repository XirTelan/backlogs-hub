export type InputField = {
  label?: string;
  layer?: 1 | 2 | 3;
  error?: string;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
  isSimple?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextArea = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type ListItemInput = {
  onDelete: () => void;
} & InputField;

export type BacklogCreationDTO = Omit<
  BacklogDTO,
  "_id" | "updatedAt" | "createdAt"
>;

type ItemField = {
  name: string;
  value: string;
};

export type BacklogItemCreationDTO = {
  title: string;
  category: string;
  userFields: ItemField[];
};

export type BacklogItemDTO = {
  _id: string;
  backlogId: string;
  title: string;
  category: string;
  userFields: ItemField[];
};

export type TemplateDTO = {
  _id: string;
} & TemplateCreationDTO;

export type TemplateCreationDTO = {
  templateTitle: string;
  fields: Field[];
  description: string;
  features: string;
  categories: BacklogCategory[];
  author: string;
  visibility: string;
};

export type PageDefaultProps = {
  children?: React.ReactElement;
  params: {
    [key: string]: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UserDTO = {
  id: string;
  username: string;
  email: string;
  profileVisibility: string;
};

export type UserCreationDTO = {
  password?: string;
} & Omit<UserDTO, "id">;
