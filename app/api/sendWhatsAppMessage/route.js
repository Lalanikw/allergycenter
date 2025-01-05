import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { to, message } = await req.json();

    // Make sure you have these environment variables set
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error('Missing Twilio credentials');
    }

    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:+${to}`
    });

    return NextResponse.json({ success: true, messageId: response.sid });
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}