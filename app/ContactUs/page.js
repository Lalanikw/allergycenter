"use client";

import ContactForm from "../../components/ContactForm";
import { useState, useEffect } from "react";

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(null); // Initially null for a loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch("/api/getAvailabilityStatus");
        if (!response.ok) {
          throw new Error("Failed to fetch availability status");
        }
        const data = await response.json();
        setIsAvailable(data.isAvailable);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, []);

  return (
    <div className="mt-10 p-5 flex flex-col items-center">
      <div className="text-center mb-5">
        {loading ? (
          <p className="text-gray-500 text-sm md:text-md lg:text-lg font-semibold">
            Checking availability...
          </p>
        ) : error ? (
          <p className="text-red-500 text-sm md:text-md lg:text-lg font-semibold">
            Unable to fetch availability status. Please try again later.
          </p>
        ) : isAvailable ? (
          <p className="text-green-500 text-sm md:text-md lg:text-lg font-semibold">
            We are available to respond to your inquiries within 72 hours. Thank you for reaching out!
          </p>
        ) : (
          <p className="text-red-500 text-sm md:text-md lg:text-lg font-semibold">
            We are currently out of office. We will respond as soon as possible. Thank you for your patience!
          </p>
        )}
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-lg">
        <ContactForm />
      </div>
    </div>
  );
}
