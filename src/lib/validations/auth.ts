import * as z from "zod";

/**
 * Shared password validation schema
 * Used across all authentication forms
 */
export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be less than 72 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number");

/**
 * Shared email validation schema
 */
export const emailValidation = z
  .string()
  .trim()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters");

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

/**
 * Signup form validation schema
 */
export const signupSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
