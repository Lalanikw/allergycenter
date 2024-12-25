import { google } from "googleapis";
import dbConnect from "./mongodb.js";
import mongoose from "mongoose";

// Appointment model
const appointmentSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        credentials: CREDENTIALS,
        scopes: SCOPES,
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
        const appointments = await Appointment.find({}).exec();
        console.log(`Found ${appointments.length} appointments to sync`);
        
        const calendar = await authenticate();

        for (const appointment of appointments) {
            try {
                console.log(`Processing appointment: ${JSON.stringify(appointment)}`);
                const { date, timeSlot } = appointment;

                // Parse the time slot
                const { hour, minutes } = parseTimeSlot(timeSlot);

                // Create start date
                const startDate = createDateWithTime(date, hour, minutes);
                console.log(`Created start date: ${startDate.toISOString()}`);

                // Create end date (30 minutes after start)
                const endDate = new Date(startDate);
                endDate.setMinutes(endDate.getMinutes() + 30);
                console.log(`Created end date: ${endDate.toISOString()}`);

                const event = {
                    summary: "Appointment at Aloka Diagnostics",
                    description: "Medical appointment",
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
                        ]
                    }
                };

                await calendar.events.insert({
                    calendarId: "primary",
                    requestBody: event,
                });

                console.log(`Successfully synced appointment for ${startDate.toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}`);
            } catch (error) {
                console.error(`Error processing appointment ${appointment._id}:`, error);
                // Continue with next appointment instead of stopping the entire sync
                continue;
            }
        }
        console.log("Sync process completed!");
    } catch (error) {
        console.error("Error in sync process:", error);
        throw error;
    }
}
