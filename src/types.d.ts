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
  userId: string;
  userName: string;
  backlogTitle: string;
  fields: Field[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
};

type ItemField = {
  name: string;
  value: string;
};
export type BacklogItemDTO = {
  _id: string;
  backlogId: string;
  title: string;
  category: string;
  userFields: ItemField[];
};

export type BacklogCreateDTO = {
  visibility: string;
  userId: string;
  userName: string;
  backlogTitle: string;
  fields: Field[];
  categories: string[];
};

export type Field = {
  name: string;
  type: string;
  _id: string;
};

export type PageDefaultProps = {
  children: React.ReactElement;
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
