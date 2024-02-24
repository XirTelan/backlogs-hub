import { z } from "zod";

export const RegistrationSchema = z.object({
  username: z
    .string()
    .min(4)
    .regex(new RegExp(/^[a-zA-Z0-9_=]+$/), {
      message: `Username can only contain letters, numbers, "-", and "_"`,
    }),
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

export const SignInSchema = RegistrationSchema.omit({ email: true });

export const FieldSchema = z.object({
  name: z.string(),
  protected: z.boolean(),
  type: z.enum(["text", "number"]),
});
export const BacklogCategorySchema = z.object({
  name: z.string(),
  color: z.string().min(7).max(7).startsWith("#"),
  protected: z.boolean(),
});

export const BacklogFormSchema = z.object({
  order: z.number().default(99),
  email: z.string().email("Email is required"),
  categories: BacklogCategorySchema.array(),
  fields: FieldSchema.array(),
  slug: z.string(),
  backlogTitle: z.string(),
  visibility: z.string(),
});

export const BacklogDTOSchema = z.union([
  z.object({
    userId: z.string(),
    userName: z.string(),
    visibility: z.string(),
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  BacklogFormSchema,
]);
