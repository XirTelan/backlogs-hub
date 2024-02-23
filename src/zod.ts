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
