import * as yup from "yup";

export type AuthMode = "login" | "register";

export type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const authBaseSchema = {
  email: yup
    .string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters.")
    .matches(/[a-z]/, "Password must include a lowercase letter.")
    .matches(/[A-Z]/, "Password must include an uppercase letter.")
    .matches(/[0-9]/, "Password must include a number.")
    .matches(/[^A-Za-z0-9]/, "Password must include a special character."),
};

const loginSchema: yup.ObjectSchema<AuthFormValues> = yup.object({
  ...authBaseSchema,
  confirmPassword: yup.string().optional(),
});

const registerSchema: yup.ObjectSchema<AuthFormValues> = yup.object({
  ...authBaseSchema,
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export const createAuthSchema = (mode: AuthMode) =>
  mode === "register" ? registerSchema : loginSchema;
