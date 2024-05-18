import * as z from "zod"

export const signInSchema = z.object({
    password: z.string().min(8).max(30),
    email: z.string().email(),
})