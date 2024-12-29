import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, message } = body;

    // Log the inputs to debug
    console.log('Twilio request parameters:', { to, message });

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing "to" or "message" parameter' }), 
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      body: message,
    });

    // Log the Twilio API response
    console.log('Twilio API response:', response);

    return new Response(
      JSON.stringify({ success: true, sid: response.sid }), 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { status: 500 }
    );
  }
}