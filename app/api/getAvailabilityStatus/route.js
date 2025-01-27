import dbConnect from "../../../lib/mongodb";
import { Availability } from "../../../lib/models/availability";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await dbConnect(); //connect to the db

        //Fetch the availability status
        const availability = await Availability.findOne();

         // Return the availability status
    return NextResponse.json({ isAvailable: availability?.isAvailable || false });
  } catch (error) {
    console.error("Error fetching availability status:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability status" },
      { status: 500 }
    );
  }
}