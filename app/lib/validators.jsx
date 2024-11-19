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