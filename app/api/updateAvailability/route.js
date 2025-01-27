import dbConnect from "../../../lib/mongodb";
import { Availability } from "../../../lib/models/availability";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { isAvailable } = await req.json(); // Parse request body
    await dbConnect(); // Connect to the database

    let availability = await Availability.findOne();

    // If the availability document doesn't exist, create a new one
    if (!availability) {
      availability = new Availability({ isAvailable });
    } else {
      // Update the existing document
      availability.isAvailable = isAvailable;
      availability.updatedAt = new Date();
    }

    await availability.save(); // Save the updated status

    return NextResponse.json({ success: true, isAvailable });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
