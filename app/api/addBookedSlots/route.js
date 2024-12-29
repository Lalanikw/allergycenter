import dbConnect from "../../../lib/mongodb";
import {Appointment} from "../../../lib/syncAppointments"
import { NextResponse } from 'next/server';
import mongoose from "mongoose";

// Define the schema for appointments (reuse if already defined elsewhere)
const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    timeSlot: String,
    userPhone: String,
    synced: { type: Date, default: Date.now },
    googleEventId: String,
    CreatedAt: {type: Date, default: Date.now}
});

export async function POST(request) {
    try {
        // Parse request body
        const { date, timeSlot, userPhone } = await request.json();

        // Validate input
        if (!date || !timeSlot || !userPhone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        //Parse the ISO string to create a Data object
        const bookingDate = new Date(date);

        //connect to the DB
        await dbConnect();

        // Create start and end of the day in UTC for the booking date
        const startOfDay = new Date(bookingDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        
        const endOfDay = new Date(bookingDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Check if the slot is already booked
        const existingBooking = await Appointment.findOne({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            timeSlot: timeSlot
        }).exec();

        if (existingBooking) {
            return NextResponse.json(
                { error: "This slot is already booked" },
                { status: 409 }
            );
        }

        // Create a new booking
        const newBooking = new Appointment({
            date: bookingDate, //store the exact time
            timeSlot,
            userPhone, 
            synced: false,
            googleEventId: null
        });

        const savedBooking = await newBooking.save();

        // Respond with success
        return NextResponse.json(
            {
                message: "Slot booked successfully",
                bookingId: savedBooking._id,
                bookingDate: savedBooking.date,
                userPhone: savedBooking.userPhone
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to book appointment. Please try again." },
            { status: 500 }
        );
    }
}