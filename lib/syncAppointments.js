import { google } from "googleapis";
import dbConnect from "./mongodb.js";
import mongoose from "mongoose";

// Appointment schema to track sync status
const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    userPhone: { type: String, required: true },
    synced: { type: Boolean, default: null },
    googleEventId: { type: String, required: true}
});

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        credentials: CREDENTIALS,
        scopes: SCOPES
    });

    return google.calendar({ version: "v3", auth: await auth.getClient() });
}

function parseTimeSlot(timeSlot) {
    try {
        const [time, period] = timeSlot.trim().split(" ");
        const [hours, minutes] = time.split(":").map(num => parseInt(num, 10));

        if (isNaN(hours) || isNaN(minutes)) {
            throw new Error(`Invalid time format: ${timeSlot}`);
        }

        let hour = hours;

        // Convert to 24-hour format
        if (period === "PM" && hour !== 12) {
            hour += 12;
        } else if (period === "AM" && hour === 12) {
            hour = 0;
        }

        if (hour < 0 || hour > 23 || minutes < 0 || minutes > 59) {
            throw new Error(`Invalid time values: hours=${hour}, minutes=${minutes}`);
        }

        return { hour, minutes };
    } catch (error) {
        console.error(`Error parsing time slot: ${timeSlot}`);
        throw error;
    }
}

function createDateWithTime(baseDate, hour, minutes) {
    try {
        const date = new Date(baseDate);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid base date: ${baseDate}`);
        }

        // Set time components
        date.setHours(hour, minutes, 0, 0);

        // Validate resulting date
        if (isNaN(date.getTime())) {
            throw new Error('Invalid resulting date');
        }
        return date;
    } catch (error) {
        console.error('Error creating date:', error);
        throw error;
    }
}

    export async function syncAppointmentsToGoogleCalendar() {
        try {

            await dbConnect();
                    const appointments = await Appointment.find({
                $or: [{ synced: false }, { synced: null }]
            }).exec();
            console.log(`Found ${appointments.length} unsynced appointments`);

            const calendar = await authenticate();

            for (const appointment of appointments) {
                try {
                    console.log(`Processing appointment: ${JSON.stringify(appointment)}`);
                    const { date, timeSlot, userPhone } = appointment;

                    // Parse the time slot
                    const { hour, minutes } = parseTimeSlot(timeSlot);

                    // Create start date
                    const startDate = createDateWithTime(date, hour, minutes);
                    console.log(`Created start date: ${startDate.toISOString()}`);

                    // Create end date (15 minutes after start)
                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + 15);
                    console.log(`Created end date: ${endDate.toISOString()}`);

                    console.log(`Appointment userPhone: ${appointment.userPhone}`); // Add this line
                    if (!appointment.userPhone) {
                        console.error(`Missing userPhone for appointment ${appointment._id}`);
                        continue; // Skip processing this appointment
                    }

                    // Check if event already exists
                    const existingEvents = await calendar.events.list({
                        calendarId: "allergycenterkandy@gmail.com",
                        timeMin: startDate.toISOString(),
                        timeMax: endDate.toISOString(),
                        q: userPhone // Search by phone number in summary
                    });

                    if (existingEvents.data.items?.length > 0) {
                        console.log(`Event already exists for ${userPhone} at ${startDate}`);
                        // Update synced status even if event exists
                        appointment.synced = true;
                        appointment.googleEventId = existingEvents.data.items[0].id;
                        await appointment.save();
                        continue;
                    }

                    console.log('UserPhone:', appointment.userPhone);

                    const event = {
                        summary: `${appointment.userPhone} - Appointment`,
                        description: `Appointment for ${userPhone}`,
                        start: {
                            dateTime: startDate.toISOString(),
                            timeZone: "Asia/Colombo"
                        },
                        end: {
                            dateTime: endDate.toISOString(),
                            timeZone: "Asia/Colombo"
                        },
                        reminders: {
                            useDefault: false,
                            overrides: [
                                { method: 'email', minutes: 24 * 60 },
                                { method: 'popup', minutes: 60 }
                            ]}};

                    const response = await calendar.events.insert({
                        calendarId: "allergycenterkandy@gmail.com",
                        requestBody: event,
                    });

                    // Update appointment with sync status and event ID
                    appointment.synced = true;
                    appointment.googleEventId = response.data.id;
                    await appointment.save();

                    console.log(`Successfully synced appointment for ${startDate.toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}`);
                } catch (error) {
                    console.error(`Error processing appointment ${appointment._id}:`, error);
                    continue;
                }}
            console.log("Sync process completed!");
        } catch (error) {
            console.error("Error in sync process:", error);
            throw error;
        }
    }