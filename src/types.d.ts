export type InputField = {
  label?: string;
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

export type BacklogDTO = {
  visibility: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
} & BacklogFormData;

export type BacklogFormData = {
  userId: string;
  userName: string;
  order: number;
  slug: string;
  backlogTitle: string;
  categories: BacklogCategory[];
  fields: Field[];
  visibility: string;
};

type ItemField = {
  name: string;
  value: string;
};

export type BacklogCategory = {
  name: string;
  color: string;
  protected: boolean;
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

export type Field = {
  name: string;
  protected: boolean;
  type: "text" | "number";
};

export type PageDefaultProps = {
  children?: React.ReactElement;
  params: {
    [key: string]: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
