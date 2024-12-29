"use client"

import React, { useEffect, useState} from 'react';
import { Calendar } from "./ui/calendar"
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from "./ui/button";
import PhonePicker from './PhonePicker';

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [bookedSlots, setBookedSlots] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPhone, setUserPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const isPastday = (day) => {
  const today = new Date();
  return day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  useEffect(() => {
    const day = getDayType(date);
    getTime(day);
  }, [date, currentTime]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStringToDate = (timeStr, baseDate) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    const date = new Date(baseDate);
    let hour = parseInt(hours);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    date.setHours(hour, parseInt(minutes), 0, 0);
    return date;
  };

  const isSlotDisabled = (timeStr) => {
    const slotTime = timeStringToDate(timeStr, date);
    const oneHourBefore = new Date(slotTime.getTime() - 60 * 60 * 1000);
    return currentTime >= oneHourBefore;
  };

  const isSlotBooked = (timeStr) => {
    const dateKey = date?.toLocaleDateString("en-CA");  // Use local date string instead of ISO
    return bookedSlots[dateKey]?.includes(timeStr);
  };

  const getDayType = (date) => {
    const dayOfWeek = date?.getDay();
    if (dayOfWeek === 6) return "Saturday";
    else if (dayOfWeek >= 1 && dayOfWeek <= 5) return "Monday-Friday";
    return null;
  };

  const getTime = (day) => {
    const timeList = [];
    if (day === "Saturday") {
      for (let i = 2; i <= 3; i++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          const time = `${i}:${minutes} PM`;
          timeList.push({ time, disabled: isSlotDisabled(time) });
        });
      }
    } else if (day === "Monday-Friday") {
      for (let i = 4; i <= 5; i++) {
        ["00", "15", "30", "45"].forEach((minutes) => {
          const time = `${i}:${minutes} PM`;
          timeList.push({ time, disabled: isSlotDisabled(time) });
        });
      }
    }
    setTimeSlot(timeList);
  };

  const validatePhone = (phone) => {
    // Basic phone validation for Sri Lankan numbers
    const phoneRegex = /^(?:\+94|94|0)?[1-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

 const formatPhoneNumber = (phone) => {
    // Format phone number to include country code if not present
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '');
    if (cleanPhone.startsWith('94')) {
      return cleanPhone;
    }
    if (cleanPhone.startsWith('0')) {
      return '94' + cleanPhone.slice(1);
    }
    return '94' + cleanPhone;
  };

  const handleBooking = async () => {
    if (!date || !selectedTimeSlot) {
      alert("Please select a valid date and time slot.");
      return;
    }

    if (!userPhone) {
      setPhoneError('Please enter your phone number');
      return;
    }

    if (!validatePhone(userPhone)) {
      setPhoneError('Please enter a valid Sri Lankan phone number');
      return;
    }

    setPhoneError('');
  
    const formattedUserPhone = formatPhoneNumber(userPhone);

    // Parse the selected time
    const [time, period] = selectedTimeSlot.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    
    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    // Create a new date object with the selected date and time
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(hour, parseInt(minutes), 0, 0);

    const bookingData = {
      date: bookingDateTime.toISOString(),  // This preserves the exact time
      timeSlot: selectedTimeSlot,
      userPhone: formattedUserPhone
    };

    // For UI state management, use the date in local timezone
    const dateKey = bookingDateTime.toLocaleDateString("en-CA");

    try {
      const response = await fetch("/api/addBookedSlots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBookedSlots((prev) => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), selectedTimeSlot],
        }));

        const formattedDate = bookingDateTime.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

       // Messages
      const ownerMessage = `🏥 New Appointment\n\n📅 Date: ${formattedDate}\n⏰ Time: ${selectedTimeSlot}\n📞 Patient Phone: ${formattedUserPhone}`;
      const userMessage = `🏥 Your Appointment is Confirmed!\n\n📅 Date: ${formattedDate}\n⏰ Time: ${selectedTimeSlot}\n📍 Location: Aloka Diagnostics\nNo 673, Williamgopallawa Mawatha, Kandy.\n☎️ For queries: +94-81-3838-767`;

      // Send WhatsApp messages via API
      await fetch('/api/sendWhatsAppMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_OWNER_PHONE,
          message: ownerMessage,
        }),
      });

      await fetch('/api/sendWhatsAppMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: `whatsapp:+${formattedUserPhone}`,
          message: userMessage,
        }),
      });

      alert("Booking successful! WhatsApp messages sent.");
    } else {
      alert("Error booking slot. Please try again.");
    }
  } catch (error) {
    console.error("Error booking slot:", error);
    alert("Error booking slot. Please try again.");
  }
};

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
    setLoading(true);
    const response = await fetch("/api/getBookedSlots");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Convert all dates to local date keys for proper display
    const slots = data.reduce((acc, curr) => {
      const localDateKey = new Date(curr.date).toLocaleDateString("en-CA"); // 'YYYY-MM-DD'
      if (!acc[localDateKey]) {
        acc[localDateKey] = [];
      }
      acc[localDateKey].push(curr.timeSlot);
      return acc;
    }, {});

    setBookedSlots(slots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      setError("Failed to load bookings. Please try again later.");
      setBookedSlots({});
    } finally {
      setLoading(false);
    }
   };
      fetchBookedSlots();
    }, []);

    return (
      <div className='flex gap-36 justify-center'>

          {error && (
          <div className="absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Left side*/}
        <div className='pt-5 '>

          <div className='flex gap-5'>
                  {/* Calendar*/}
                  <div className='gap-4 pb-4 items-baseline'>
                          <p className='flex gap-3 items-center'>
                              <CalendarDays className='text-[#0C4A6E] gap-3 ' />
                              Select a Date </p>
                          <div className='flex'>
                              <Calendar
                                      mode="single"
                                      selected={date}
                                  onSelect={setDate}
                                  disabled={isPastday} 
              className="rounded-md border border-[#0C4A6E] "
            />
                      </div>
                      </div>

              <div className='mt-3 md:mt-0'>
                  {/* time slot*/}
                      <div>
                                  <p className='flex gap-3 items-center'>
                                      <Clock className='text-[#0C4A6E] gap-3 lg:text-sm md:text-sm sm:text-sm font-semibold'/>
                                      Select a Time Slot
                                  </p>
                                  <div className="grid grid-cols-4 p-2 rounded-md border border-[#0C4A6E] gap-2">
                    {timeSlot?.length > 0 ? (
                      timeSlot.map((item, index) => (
                                <p
                                key={index}
                                onClick={() =>
                                  !bookedSlots[date.toISOString().split("T")[0]]?.includes(item.time) &&
                                  !item.disabled &&
                                  setSelectedTimeSlot(item.time)
                                }
                                className={`p-1 border cursor-pointer text-center rounded-md ${
                                  isSlotBooked(item.time) || item.disabled
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "hover:bg-[#0C4A6E] hover:text-white"
                                } ${
                                  item.time === selectedTimeSlot && "bg-red-400 text-[#0C4A6E]"
                                }`}
                              >
                                {item.time} </p> ))
                                      ) : (
                                      <p className="col-span-3 text-center text-gray-500">
                              No available slots. </p>)}
                      </div>
                      </div>
            
                  {/* phone number*/}
              <PhonePicker
              userPhone={userPhone} setUserPhone={setUserPhone}/>
                  
                </div>

          </div>
          <div className='flex'>

            {/* button*/}
                <div className='pt-5'>
                        <Button
                            type="button"
                            disabled={!(date && selectedTimeSlot && userPhone && !phoneError)}
                            onClick={handleBooking}
                                className="p-5 text-md justify-end bg-red-600 text-white"
                            >
                                Book an Appointment
                            </Button>
                </div>
          </div>

        </div>

    </div>
    );
}

export default CalendarApp;