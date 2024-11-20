import { z } from "zod";

export const UsernameSchema = z.object({
    username: z
        .string()
        .min(3)
        .max(25)
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "String must contain only letters, numbers, and underscores",
        })
});

export const eventSchema = z.object({
    title: z
    .string()
    .min(1, "Title is Required")
    .max(100, "Title must be at least 100 characters or less"),
    description: z
    .string()
    .min(1, "Description is Required")
    .max(500, "Description must be at least 500 characters or less"),
    duration: z.number().int().positive("Duration must be positive Number"),
    isPrivate: z.boolean(),
});