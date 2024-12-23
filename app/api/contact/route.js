import nodemailer from "nodemailer"

export async function POST(req) {
  
  const { fullname, email, message } = await req.json();
  
  //client side validation
  if (!fullname?.trim() || !email?.trim() || !message?.trim()) {
  return new Response(
    JSON.stringify({ success: false, msg: "All fields are required." }),
    { status: 400 }
  );
}

    //configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", //Use your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //email option
    const mailOptions = {
        from: email, //Sender's email
        to: "allergycenterkandy@gmail.com", //Your email
        subject: `New Contact Form Submission from ${fullname}`,
        text: `You have received a new message:\n\nName: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    console.log("Sending email with options:", mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, msg: "Email sent successfully!" }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error sending email: ", error);
    return new Response(
      JSON.stringify({ success: false, msg: "Failed to send email." }),
      { status: 500 }
    );
  }
}