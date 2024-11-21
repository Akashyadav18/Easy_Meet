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

export const daySchema = z
    .object({
        isAvailable: z.boolean(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.isAvailable) {
                return data.startTime < data.endTime;
            }
            return true;
        },
        {
            message: "End time must be more than start time",
            path: ["endTime"],
        }
    );

export const availabilitySchema = z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap: z.number().min(0, "Time gap must be 0 or more minutes").int(),
});