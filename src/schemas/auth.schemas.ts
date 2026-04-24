import * as zod from "zod";

export const myRegisterschema = zod
  .object({
    name: zod
      .string("name must be text")
      .nonempty("name is required")
      .min(3, "min length is 3 chars")
      .max(15, "max length is 15 chars"),
    email: zod.email("invalid email").nonempty("email is required"),
    phone: zod
      .string()
      .nonempty("phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}/,
        `password must contain 1 number (0-9)
    password must contain 1 uppercase letters
    password must contain 1 lowercase letters
    password must contain 1 non-alpha numeric number
    password is 8-16 characters with no space`,
      ),
    rePassword: zod.string().nonempty("rePassword is required"),
  })
  .refine(
    (object) => {
      return object.password === object.rePassword;
    },
    {
      error: "password & rePassword not matched !",
      path: ["rePassowrd"],
    },
  );

export type RegisterSchemaType = zod.infer<typeof myRegisterschema>;

export const LoginSchema = zod.object({
  email: zod.email("invalid email").nonempty("email is required"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}/,
      `password must contain 1 number (0-9)
    password must contain 1 uppercase letters
    password must contain 1 lowercase letters
    password must contain 1 non-alpha numeric number
    password is 8-16 characters with no space`,
    ),
});
export type LoginType = zod.infer<typeof LoginSchema>;

export const ChangePasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty("Current password is required"),
    password: zod
      .string()
      .nonempty("New password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: zod.string().nonempty("Please confirm your new password"),
  })
  .refine((obj) => obj.password === obj.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type ChangePasswordType = zod.infer<typeof ChangePasswordSchema>;

export const ForgetPasswordSchema = zod.object({
  email: zod.email("Invalid email address").nonempty("Email is required"),
});

export type ForgetPasswordType = zod.infer<typeof ForgetPasswordSchema>;

export const UpdateProfileSchema = zod.object({
  name: zod
    .string()
    .nonempty("Full name is required")
    .min(3, "Name must be at least 3 characters"),
  email: zod.email("Invalid email address").nonempty("Email is required"),
  phone: zod
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

export type UpdateProfileType = zod.infer<typeof UpdateProfileSchema>;
