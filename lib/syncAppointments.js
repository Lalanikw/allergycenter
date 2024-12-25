import { google } from "googleapis";
import dbConnect from "./mongodb";
import mongoose from "mongoose";

//Appointment model
const appointmentSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

//Google Calendar API credentials
const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        credentials: CREDENTIALS,
        scopes: SCOPES,
    });

    return google.calendar({ version: "v3", auth: await auth.getClient() });
}

export async function syncAppointmentsToGoogleCalendar() {
    try {
        //Connect to MongoDB
        await dbConnect();

        //fetch all appointments from the database
        const appointments = await Appointment.find({}).exec();

        //authenticate with Google Calendar API
        const calendar = await authenticate();

        //Loop through appointments and create events
        for (const appointment of appointments) {
            const { date, timeSlot } = appointment;

            //Create a start and end time based on the date and time slot
            const [startHour, startMinute] = timeSlot.split(":");
            const startDate = new Date(date);
            startDate.setHours(startHour, startMinute);

            const endDate = new Date(startDate);
            endDate.setMinutes(endDate.getMinutes() + 30);

            //Create a calendar event
            const event = {
                summary: "Appointment", // can customize the title
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: "UTC", //pick the right time zone
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: "UTC",
                },
            };

            //Insert the event into Google Calendar
            await calendar.events.insert({
                calendarId: "primary", //use the primary calendar
                requestBody: event,
            });

             console.log(`Appointment on ${startDate} synced to Google Calendar.`);
        }
        console.log("All appointments synced successfully!");
    } catch (error) {
        console.error("Error syncing appointments:", error);
    }
}