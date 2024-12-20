import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

export async function creatingBooking(bookingData) {
    try {
        // Fetch the event and its creator
        const event = await db.event.findUnique({
            where: { id: bookingData.eventId },
            include: { user: true },
        });

        if (!event) {
            throw new Error("Event not found");
        }
        //use google calender api to generate meet link and add to calendar
        // Get the event creator's Google OAuth token from Clerk
        const { data } = await clerkClient.users.getUserOauthAccessToken(
            event.user.clerkUserId,
            "oauth_google"
        );

        const token = data[0]?.token;

        if (!token) {
            throw new Error("Event creator has not connected Google Calendar");
        }

        // Set up Google OAuth client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const meetResponse = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: {
                
            }
        });

    } catch (error) {

    }
}