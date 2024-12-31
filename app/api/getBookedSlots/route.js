import dbConnect from "../../../lib/mongodb";
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    userPhone: String,
    title: String,
    synced: { type: Date, default: Date.now },
    googleEventId: String,
    createdAt: { type: Date, default: Date.now }
});

// Add a virtual getter for local date
appointmentSchema.virtual('localDate').get(function() {
    return this.date ? new Date(this.date) : null;
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export async function GET() {

    try {
        await dbConnect();

        // Get current date in local timezone
        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
        
        const appointments = await Appointment
            .find({
                // Only fetch future appointments
                date: { $gte: startOfToday }
            })
            .sort({ date: 1, timeSlot: 1 })
            .lean() // Convert to plain JavaScript objects
            .exec();

        // Transform dates to local timezone before sending
        const transformedAppointments = appointments.map(appointment => ({
            ...appointment,
            date: new Date(appointment.date).toISOString(), // Convert to ISO string with timezone info
            localDate: new Date(appointment.date).toLocaleDateString('en-CA'), // Add local date for UI
            userPhone: appointment.userPhone || null
        }));

        return NextResponse.json(transformedAppointments || [], { status: 200 });

    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}