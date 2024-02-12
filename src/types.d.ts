export type InputField = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
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
  categories: { name: string; color: string }[];
  fields: Field[];
};

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

export type Field = {
  name: string;
  type: "text" | "number";
  _id: string;
};

export type PageDefaultProps = {
  children?: React.ReactElement;
  params: {
    [key: string]: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
