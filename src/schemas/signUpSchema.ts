import * as z from "zod"

export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username must only contain alphanumeric characters and underscores or hyphens")
    .optional()

export const signUpSchema = z.object({
    name: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
})