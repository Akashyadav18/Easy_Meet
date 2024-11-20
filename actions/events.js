"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { eventSchema } from "@/app/lib/validators";

export async function createEvent(data) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = eventSchema.parse(data);

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const event = await db.event.create({
        data: {
            ...validatedData,
            userId: user.id,
        },
    });

    return event;

    // try {
    //     // Use currentUser() instead of auth()
    //     const user = await currentUser();

    //     if (!user) {
    //         throw new Error("Unauthorized - No user found");
    //     }

    //     console.log("Clerk User ID:", user.id);

    //     const validatedData = eventSchema.parse(data);

    //     // First find or create the user in your database
    //     // const dbUser = await db.user.upsert({
    //     //     where: {
    //     //         clerkUserId: user.id
    //     //     },
    //     //     update: {},
    //     //     create: {
    //     //         clerkUserId: user.id,
    //     //         email: user.emailAddresses[0]?.emailAddress,
    //     //         name: `${user.firstName} ${user.lastName}`
    //     //     }
    //     // });
    //     const user = await db.user.findUnique({
    //             where: { clerkUserId: userId },
    //         });
        

    //     console.log("Database User:", dbUser);

    //     // Now create the event with the confirmed database user ID
    //     const event = await db.event.create({
    //         data: {
    //             ...validatedData,
    //             userId: dbUser.id,
    //         },
    //     });

    //     return event;
    // } catch (error) {
    //     console.error("Create Event Error:", error);
    //     throw new Error(error.message || "Failed to create event");
    // }
}
