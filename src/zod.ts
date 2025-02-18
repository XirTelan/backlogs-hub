import { z } from "zod";

// Backlog
export const FieldSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().trim().min(1, "This field cannot be empty"),
    protected: z.boolean().default(false),
  })
  .and(
    z.discriminatedUnion("type", [
      z.object({
        type: z.enum(["text", "markdown", "number", "date", "timer"]),
      }),
      z.object({
        type: z.literal("select"),
        data: z.string().array(),
      }),
    ]),
  );

export const BacklogTagsSchema = z.object({
  name: z.string().trim().min(1, "This field cannot be empty"),
  color: z.string().min(7).max(7).startsWith("#"),
});

export const BacklogCategorySchema = z
  .object({
    name: z.string().trim().min(1, "This field cannot be empty"),
    color: z.string().min(7).max(7).startsWith("#"),
    protected: z.boolean().default(false),
    order: z.number().default(99),
  })
  .required();

export const ModifiersSchema = z.object({
  useSteamSearch: z.boolean().default(false),
  useSteamImport: z.boolean().default(false),
  useTagsSystem: z.boolean().default(false),
});

export const BacklogFormSchema = z.object({
  order: z.number().default(99),
  categories: BacklogCategorySchema.array()
    .min(1)
    .superRefine((val, ctx) => uniqueArray(val, ctx, (item) => item.name)),
  tags: BacklogTagsSchema.array()
    .superRefine((val, ctx) => uniqueArray(val, ctx, (item) => item.name))
    .optional(),
  modifiers: ModifiersSchema.default({
    useSteamImport: false,
    useSteamSearch: false,
    useTagsSystem: false,
  }),
  folder: z.string().default("Default"),
  fields: FieldSchema.array()
    .superRefine((val, ctx) => uniqueArray(val, ctx, (item) => item.name))
    .optional(),
  slug: z.string(),
  backlogTitle: z.string().trim().min(1, "This field cannot be empty"),
  description: z.string().optional().default(""),
  view: z.enum(["Default", "Board", "Notes"]).default("Default"),

  visibility: z.enum(["public", "private"]).default("private"),
});

export const BacklogDTOSchema = BacklogFormSchema.merge(
  z.object({
    userId: z.string(),
    userName: z.string(),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    totalCount: z.number().default(0),
  }),
);

export const BacklogCreationSchema = BacklogDTOSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});
export const BacklogItemPopUserFieldSchema = z.object({
  backlogFieldId: z.string(),
  title: z.string(),
  type: z.string(),
  value: z.string(),
});

export const BacklogItemUserFieldSchema = z.object({
  backlogFieldId: z.string(),
  value: z.string(),
});

export const BacklogItemCreationSchema = z.object({
  backlogId: z.string(),
  title: z.string().trim(),
  category: z.string(),
  tags: z.string().array().optional(),
  userFields: BacklogItemUserFieldSchema.array(),
  modifiersFields: z
    .object({
      steamAppId: z.string().optional(),
      order: z.number().optional(),
    })
    .default({}),
});

export const BacklogItemSchema = BacklogItemCreationSchema.merge(
  z.object({
    _id: z.string(),
    createdAt: z.date().or(z.string()).optional(),
    updatedAt: z.date().or(z.string()).optional(),
  }),
);

export const BacklogItemPopSchema = BacklogItemSchema.omit({
  userFields: true,
}).merge(
  z.object({
    userFields: BacklogItemPopUserFieldSchema.array(),
  }),
);

//Account
export const OauthSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  provider: z.string(),
});

export const AccountSchema = z
  .object({ _id: z.string() })
  .merge(OauthSchema.omit({ username: true }));

export const RegistrationSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        message: `Username must be at least 4 characters`,
      })
      .regex(new RegExp(/^[a-zA-Z0-9_=]+$/), {
        message: `Username can only contain letters, numbers and "_"`,
      }),
    email: z.string().email("Email is required. Pattern: example@domain.com"),
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

//USER
export const StatsSchema = z.object({
  totalBacklogs: z.number().default(0),
  totalTemplates: z.number().default(0),
});
export const ConfigSchema = z.object({
  profileVisibility: z.enum(["public", "private"]),
  hideFolderNames: z.boolean().default(false),
  showEmptyFolders: z.boolean().default(true),
  canChangeUserName: z.boolean().default(false),
  pagination: z.enum(["bottom", "top", "both"]).default("bottom"),
  hideAsideNavBacklogs: z.boolean().default(false),
  categoryDesignation: z
    .enum(["color", "colorMark", "explicit", "none"])
    .default("color"),
  categoryBlockView: z
    .enum(["buttons", "dropDown", "dynamic"])
    .default("buttons"),
});

export const UserBase = z.object({
  _id: z.string(),
  username: z
    .string()
    .min(4)
    .regex(new RegExp(/^[a-zA-Z0-9_=]+$/), {
      message: `Username can only contain letters, numbers and "_"`,
    }),
});

export const UserSchema = UserBase.merge(
  z.object({
    displayName: z.string(),
    description: z.string(),
    provider: z.enum(["credentials", "oauth"]),
    password: z.string(),
    accounts: z.union([z.string().array(), AccountSchema.array()]),
    folders: z.string().array(),
    email: z.string().email(),
    config: ConfigSchema,
    stats: StatsSchema,
  }),
);

export const rawPasswordSchema = z.string().min(6);
export const isEmailSchema = z.string().email();

//TEmplate
export const TemplateDTOSchema = BacklogFormSchema.omit({
  backlogTitle: true,
  order: true,
  slug: true,
}).merge(
  z.object({
    _id: z.string(),
    templateTitle: z.string(),
    author: z.string(),
    userId: z.string(),
  }),
);
export const TemplateCreateSchema = TemplateDTOSchema.omit({ _id: true });

//News

export const NewsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  text: z.string(),
  date: z.date().optional(),
});

//utils
const uniqueArray = <T>(
  items: T[],
  ctx: z.RefinementCtx,
  getter: (val: T) => string,
) => {
  const hashMap = new Map();
  items.forEach((item, indx) => {
    if (hashMap.has(getter(item))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No duplicates allowed.`,
        path: [indx, "name"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No duplicates allowed.`,
        path: [hashMap.get(getter(item)), "name"],
      });
    }
    hashMap.set(getter(item), indx);
  });
};

export const LogDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  description: z.string(),
  level: z.number(),
});
export const LogDataDTOSchema = LogDataSchema.merge(
  z.object({
    code: z.string(),
    confirmCode: z.string(),
  }),
);
