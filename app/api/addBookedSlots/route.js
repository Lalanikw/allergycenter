import dbConnect from "../../../lib/mongodb";
import { Appointment } from "../../../lib/syncAppointments";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Safely parse request body
        let requestBody;
        try {
            requestBody = await request.json();
        } catch (err) {
            console.error("Invalid JSON payload:", err);
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        const { date, timeSlot, userPhone } = requestBody;
        // Log the parsed body directly
        console.log("Received appointment data:", requestBody);

        // Input validation
        if (!date || !timeSlot || !userPhone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Parse date
        const bookingDate = new Date(date);

        // Connect to the database
        await dbConnect();

        // Define start and end of day in UTC
        const startOfDay = new Date(bookingDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(bookingDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Check if the slot is already booked
        const existingBooking = await Appointment.findOne({
            date: { $gte: startOfDay, $lte: endOfDay },
            timeSlot: timeSlot,
        }).exec();

        if (existingBooking) {
            return NextResponse.json(
                { error: "This slot is already booked" },
                { status: 409 }
            );
        }

        // Save new booking
        const newBooking = new Appointment({
            date: bookingDate,
            timeSlot,
            userPhone,
            synced: null,
            googleEventId: null,
        });

        const savedBooking = await newBooking.save();

        // Debugging log
        console.log("Saved booking:", savedBooking);

        // Return success response
        return NextResponse.json(
            {
                message: "Slot booked successfully",
                bookingId: savedBooking._id,
                bookingDate: savedBooking.date,
                userPhone: savedBooking.userPhone,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Database Error:", error.message || error);
        return NextResponse.json(
            { error: "Failed to book appointment. Please try again." },
            { status: 500 }
        );
    }
}
