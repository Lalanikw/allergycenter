import dbConnect from "../../../lib/mongodb";
import {Appointment} from "../../../lib/syncAppointments"
import { NextResponse } from 'next/server';

export async function POST(request) {
    
    try {

        //Parse request body with validation for JSON
        let requestBody;
        try {
            requestBody = await request.json();     
        }
        
     catch (err) {
        console.error("Invalid JSON payload:", err);
        return NextResponse.json(
            { error: "Invalid request format" },
            { status: 400 }
        );
    }
        // Parse request body
        const { date, timeSlot, userPhone } = requestBody;

 // Debug logging
        console.log('Received appointment data:', { date, timeSlot, userPhone });

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
            synced: null,
            googleEventId: null
        });

        const savedBooking = await newBooking.save();

        // debug logging
        console.log('Saved booking:', savedBooking);

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