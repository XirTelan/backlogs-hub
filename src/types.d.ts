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
  type: "text" | "number";
  _id: string;
};

export type BacklogFormData = {
  userId: string;
  userName: string;
  backlogTitle: string;
  categories: { name: string; color: string }[];
  fields: {
    name: string;
    type: "text" | "number";
  }[];
};

export type PageDefaultProps = {
  children: React.ReactElement;
  params: {
    [key: string]: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
