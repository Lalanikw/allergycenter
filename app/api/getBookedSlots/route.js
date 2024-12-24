import dbConnect from "../../../lib/mongodb";
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const appointmentSchema = new mongoose.Schema({
    date: Date,
    timeSlot: String,
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export async function GET() {

    try {
        await dbConnect();
        
        const appointments = await Appointment
            .find({})
            .sort({ date: 1, timeSlot: 1 })
            .exec();

        //Always return an array, even if empty
        return NextResponse.json(appointments || [], { status: 200 });

    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}