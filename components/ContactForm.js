"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import "./ContactForm.css";
import Link from "next/link";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    
     // Client-side validation
  if (!fullname || !email || !message) {
    setError("All fields are required.");
    return;
  }

  console.log("Full name: ", fullname);
  console.log("Email: ", email);
  console.log("Message: ", message);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    });

    const { success, msg } = await res.json();

    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
      setError(""); //clear any previous errors
      window.location.href = "/thankyou"; // Redirect to Thank You page
    } else {
      setError(msg);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    setError("Something went wrong. Please try again.");
  }
};

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="ContactForm gap-3 " >
        <div>
          <label
            className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'
            htmlFor="fullname">Full Name*</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="John Doe"
          className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm'/>
        </div>

        <div>
          <label
            className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'
            htmlFor="email">Email*</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="john@gmail.com"
            className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm'
          />
        </div>

        <div>
          <label
            className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'
            htmlFor="message">Your Message*</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="message"
            placeholder="Type your message here..."
            className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm'
          ></textarea>
        </div>

        <Button
          type="button"
          disabled={!(fullname && email && message)}
            className=" text-md bg-red-600 text-white"><Link href='/Thankyou'>
              Submit
                  </Link>
                  
                </Button>
      </form>
    </div>
  );
}