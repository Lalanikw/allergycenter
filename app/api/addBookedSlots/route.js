import dbConnect from "../../../lib/mongodb";
import { NextResponse } from 'next/server';
import mongoose from "mongoose";

// Define the schema for appointments (reuse if already defined elsewhere)
const appointmentSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
    createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export async function POST(request) {
    try {
        // Parse request body
        const { date, timeSlot } = await request.json();

        // Validate input
        if (!date || !timeSlot) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Check if the slot is already booked
        const existingBooking = await Appointment.findOne({ date, timeSlot }).exec();
        if (existingBooking) {
            return NextResponse.json(
                { error: "This slot is already booked" },
                { status: 409 }
            );
        }

        // Create a new booking
        const newBooking = new Appointment({ date, timeSlot });
        const savedBooking = await newBooking.save();

        // Respond with success
        return NextResponse.json(
            { message: "Slot booked successfully", bookingId: savedBooking._id },
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