
import dbConnect from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    await dbConnect();
    
    const { to, templateName, templateData, languageCode = "en_US" } = await req.json();

    if (!to || !templateName || !templateData) {
      return NextResponse.json(
        { error: "Missing required fields: 'to', 'templateName', and 'templateData' are required" },
        { status: 400 }
      );
    }

    // Make sure you have these environment variables set
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Missing Twilio credentials');
      return NextResponse.json(
        { success: false, error: 'Missing Twilio configuration' },
        { status: 500 }
      );
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Format the from number
    const formattedFromNumber = fromNumber.startsWith('whatsapp:+') 
      ? fromNumber 
      : `whatsapp:+${fromNumber.replace(/^\+/, '')}`;

    // Format the to number
    const formattedToNumber = to.replace(/[^\d+]/g, ''); 
    const toNumberWithPlus = formattedToNumber.startsWith('+') 
      ? formattedToNumber 
      : `+${formattedToNumber}`;
    const finalToNumber = `whatsapp:${toNumberWithPlus}`;
    
    // Log the numbers for debugging
    console.log('Sending WhatsApp template message:');
    console.log('From:', formattedFromNumber);
    console.log('To:', to);
    console.log("Template Name:", templateName);
    console.log("Template Data:", templateData);


    // Send message using correct template format
    const response = await client.messages.create({
      from: formattedFromNumber,
      to: finalToNumber,
      body: "Your appointment has been confirmed!\n" +
            `📅 Date: ${templateData[0]}\n` +
            `⏰ Time: ${templateData[1]}\n\n` +
            "We look forward to seeing you!",
    });

    console.log("Twilio Response:", response);

    return NextResponse.json({
      success: true,
      messageId: response.sid,
      status: response.status,
    });
  } catch (error) {
    console.error("WhatsApp API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        moreInfo: error.moreInfo,
      },
      {
        status: error.status || 500,
      }
    );
  }
}