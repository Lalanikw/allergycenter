import { google } from "googleapis";
import dbConnect from "./mongodb.js";
import mongoose from "mongoose";
import moment from 'moment-timezone';

// Appointment schema to track sync status
const appointmentSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
    userPhone: String,
    synced: { type: Date, default: null },
    googleEventId: { type: String, default: null}
});

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

    const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const SCOPES = ["https://www.googleapis.com/auth/calendar"];
    const TIMEZONE = "Asia/Colombo";

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
        // Create a moment object in the specified timezone
        const date = moment.tz(baseDate, TIMEZONE);
        
        // Set the time components
        date.hour(hour).minute(minutes).second(0).millisecond(0);
        
        if (!date.isValid()) {
            throw new Error('Invalid resulting date');
        }
        
        return date.toDate();
    } catch (error) {
        console.error('Error creating date:', error);
        throw error;
    }
}

export async function syncAppointmentsToGoogleCalendar() {
    try {
        await dbConnect();
        const appointments = await Appointment.find({
            $or: [{ synced: null }]
        }).exec();
        console.log(`Found ${appointments.length} unsynced appointments`);

        const calendar = await authenticate();

        for (const appointment of appointments) {
            try {
                console.log(`Processing appointment: ${JSON.stringify(appointment)}`);
                const { date, timeSlot, userPhone } = appointment;

                const { hour, minutes } = parseTimeSlot(timeSlot);

                // Create start date with explicit timezone handling
                const startDate = moment.tz(createDateWithTime(date, hour, minutes), TIMEZONE);
                console.log(`Created start date: ${startDate.format()}`);

                // Create end date (15 minutes after start)
                const endDate = startDate.clone().add(15, 'minutes');
                console.log(`Created end date: ${endDate.format()}`);

                if (!appointment.userPhone) {
                    console.error(`Missing userPhone for appointment ${appointment._id}`);
                    continue;
                }

                const existingEvents = await calendar.events.list({
                    calendarId: "allergycenterkandy@gmail.com",
                    timeMin: startDate.format(),
                    timeMax: endDate.format(),
                    q: userPhone
                });

                if (existingEvents.data.items?.length > 0) {
                    console.log(`Event already exists for ${userPhone} at ${startDate.format()}`);
                    appointment.synced = new Date();
                    appointment.googleEventId = existingEvents.data.items[0].id;
                    await appointment.save();
                    continue;
                }

                const event = {
                    summary: `${appointment.userPhone} - Appointment`,
                    description: `Appointment for ${userPhone}`,
                    start: {
                        dateTime: startDate.format(),
                        timeZone: TIMEZONE
                    },
                    end: {
                        dateTime: endDate.format(),
                        timeZone: TIMEZONE
                    },
                    reminders: {
                        useDefault: false,
                        overrides: [
                            { method: 'email', minutes: 24 * 60 },
                            { method: 'popup', minutes: 60 }
                        ]
                    }
                };

                const response = await calendar.events.insert({
                    calendarId: "allergycenterkandy@gmail.com",
                    requestBody: event,
                });

                appointment.synced = null;
                appointment.googleEventId = response.data.id;
                await appointment.save();

                console.log(`Successfully synced appointment for ${startDate.format('LLLL')}`);
            } catch (error) {
                console.error(`Error processing appointment ${appointment._id}:`, error);
                continue;
            }
        }
        console.log("Sync process completed!");
    } catch (error) {
        console.error("Error in sync process:", error);
        throw error;
    }
}