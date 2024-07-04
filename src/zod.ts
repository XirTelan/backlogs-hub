import { z } from "zod";

export const RegistrationSchema = z
  .object({
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
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must have at least 6 characters" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm)
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
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
    protected: z.boolean().default(false),
  })
  .required()
  .and(
    z.discriminatedUnion("type", [
      z.object({
        type: z.enum(["text", "number", "date", "timer"]),
      }),
      z.object({
        type: z.literal("select"),
        data: z.string().array(),
      }),
    ]),
  );
export const BacklogCategorySchema = z
  .object({
    name: z.string().trim().min(1, "This field cannot be empty"),
    color: z.string().min(7).max(7).startsWith("#"),
    protected: z.boolean().default(false),
  })
  .required();

export const BacklogFormSchema = z.object({
  order: z.number().default(99),
  categories: BacklogCategorySchema.array().min(1),
  features: z.string().array().optional(),
  folder: z.string().default("Default"),
  fields: FieldSchema.array()
    .superRefine((val, ctx) => {
      const set = new Map();
      const n = val.length;
      for (let i = 0; i < n; i++) {
        if (set.has(val[i].name)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `No duplicates allowed.`,
            path: [i, "name"],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `No duplicates allowed.`,
            path: [set.get(val[i].name), "name"],
          });
        }
        set.set(val[i].name, i);
      }
    })
    .optional(),
  slug: z.string(),
  backlogTitle: z.string().trim().min(1, "This field cannot be empty"),
  description: z.string().optional().default(""),
  visibility: z.enum(["public", "private"]).default("private"),
});

export const BacklogDTOSchema = BacklogFormSchema.merge(
  z.object({
    userId: z.string(),
    userName: z.string(),
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    totalCount: z.number().default(0),
  }),
);

export const BacklogCreationSchema = BacklogDTOSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});
export const BacklogItemUserFieldSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const BacklogItemCreationSchema = z.object({
  backlogId: z.string(),
  title: z.string().trim(),
  category: z.string(),
  userFields: BacklogItemUserFieldSchema.array(),
});
export const BacklogItemSchema = BacklogItemCreationSchema.merge(
  z.object({
    _id: z.string(),
    lowerCategory: z.string().toLowerCase(),
  }),
);

export const DndDataSchema = z.record(z.string(), BacklogDTOSchema.array());

export const ConfigSchema = z.object({
  profileVisibility: z.enum(["public", "private"]),
  hideFolderNames: z.boolean().default(false),
  showEmptyFolders: z.boolean(),
  canChangeUserName: z.boolean().default(false),
});
export const OauthSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  provider: z.string(),
});
export const AccountSchema = OauthSchema.omit({ username: true });
export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  displayName: z.string(),
  description: z.string(),
  provider: z.enum(["credentials", "oauth"]),
  password: z.string(),
  accounts: z.string().array(),
  folders: z.string().array(),
  email: z.string().email(),
  config: ConfigSchema,
});

export const rawPasswordSchema = z.string().min(6);
export const isEmailSchema = z.string().email();

export const TemplateDTOSchema = BacklogFormSchema.omit({
  backlogTitle: true,
  order: true,
  slug: true,
}).merge(
  z.object({
    _id: z.string(),
    templateTitle: z.string(),
    author: z.string(),
  }),
);

// z.object({
//   templateTitle: z.string(),
//   fields: FieldSchema.array(),
//   description: z.string(),
//   features: z.string(),
//   categories: BacklogCategory[],
//   author: z.string(),
//   visibility: z.string(),
// })
