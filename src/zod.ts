import { z } from "zod";

export const RegistrationSchema = z.object({
  username: z
    .string()
    .min(4)
    .regex(new RegExp(/^[a-zA-Z0-9_=]+$/), {
      message: `Username can only contain letters, numbers, "-", and "_"`,
    }),
  email: z.string().email("Email is required"),
  folders: z.string().array().default(["Default"]),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

export const SignInSchema = z
  .object({
    login: z.string().trim().min(1),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" }),
  })
  .required();
export const FieldSchema = z
  .object({
    name: z.string().trim().min(1, "This field cannot be empty"),
    protected: z.boolean(),
    type: z.enum(["text", "number"]),
  })
  .required();
export const BacklogCategorySchema = z
  .object({
    name: z.string().trim().min(1, "This field cannot be empty"),
    color: z.string().min(7).max(7).startsWith("#"),
    protected: z.boolean(),
  })
  .required();

export const BacklogFormSchema = z.object({
  order: z.number().default(99),
  categories: BacklogCategorySchema.array().min(1),
  folder: z.string().default("Default"),
  fields: FieldSchema.array(),
  slug: z.string(),
  backlogTitle: z.string().trim().min(1, "This field cannot be empty"),
  visibility: z.enum(["public", "private"]).default("private"),
});

export const BacklogDTOSchema = BacklogFormSchema.merge(
  z.object({
    userId: z.string(),
    userName: z.string(),
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const BacklogCreationSchema = BacklogDTOSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});
export const ConfigSchema = z.object({
  profileVisibility: z.enum(["public", "private"]),
  showEmptyFolders: z.boolean(),
});
export const DndDataSchema = z.record(z.string(), BacklogDTOSchema.array());

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  folders: z.string().array(),
  email: z.string(),
  profileVisibility: z.string(),
  config: ConfigSchema,
});

export const isEmailSchema = z.string().email();
