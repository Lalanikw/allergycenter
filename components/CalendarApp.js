"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { Calendar } from "./ui/calendar"
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from "./ui/button";
import Image from 'next/image';

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [bookedSlots, setBookedSlots] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const isPastday = (day) => {
    const today = new Date();
    return day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {

        setLoading(true);
        setError(null);

        const response = await fetch("/api/getBookedSlots");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        //Ensure data is an array, if not, use empty array
        const bookingsArray = Array.isArray(data) ? data : [];

        const slots = bookingsArray.reduce((acc, curr) => {
          const dateKey = new Date(curr.date).toISOString().split('T')[0];
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(curr.timeSlot);
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

  const getDayType = (date) => {
    const dayOfWeek = date.getDay();
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

  const handleBooking = async () => {
    if (!date || !selectedTimeSlot) {
    alert("Please select a valid date and time slot.");
    return;
  }

  const dateKey = date.toISOString().split("T")[0];
  if (bookedSlots[dateKey]?.includes(selectedTimeSlot)) {
    alert("This time slot is already booked. Please select a different slot.");
    return;
  }

    const bookingData = { date: dateKey, timeSlot: selectedTimeSlot };
  
    try {
      // Save booking to MongoDB
      const response = await fetch("/api/addBookedSlots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        //update local state
        setBookedSlots((prev) => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), selectedTimeSlot],
        }));

        const formattedDate = new Date(dateKey).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Format the WhatsApp message
        const message = `🏥 New Appointment\n\n📅 Date: ${formattedDate}\n⏰ Time: ${selectedTimeSlot}`;
        
        // Remove the "+" from the phone number as WhatsApp API expects numbers without it
        // But keep the country code
        const phoneNumber = "94777420981";
        
        // Use the api.whatsapp.com URL format which better handles message pre-population
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new window
        window.open(whatsappUrl, '_blank');
        
      alert("Booking successful!");
        setSelectedTimeSlot(null);

      } else {
        alert("Error booking slot. Please try again.");
      }
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Error booking slot. Please try again.");
    }
  };

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

                    {/* time slot*/}
                    <div className='mt-3 md:mt-0'>
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
                      bookedSlots[date.toISOString().split("T")[0]]?.includes(item.time) || item.disabled
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

            </div>

            {/* button*/}
            <div>
                    
                    <div className='pt-5'>
                            <Button
                                type="button"
                                disabled={!(date && selectedTimeSlot)}
                                onClick={handleBooking}
                                    className="p-5 text-md justify-end bg-red-600 text-white"
                                >
                                    Book an Appointment
                                </Button>
                    </div>
                
            </div>

        </div>

        {/*right side*/}
        <div className=" ">
                <div className=" ">
                    <div className='flex pt-5 gap-3 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    <p className=''>Our Location</p>
                    </div>
            
                            <div className=" pt-1 pb-5">
                                
                                    <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>Aloka Diagnostics </h2>
                                    <p className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>No 673, Williamgopallawa Mawatha,Kandy. </p>
                                        <div className=" bg-white  rounded-lg hover:shadow-md transition-shadow">
                            
                                            <Image className="" src="/aloka.jpg" alt="aloka-location" width={150} height={100}/>
                                        
                                    </div>

                                </div>
                </div>

                <div className="flex justify-between">
                    <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>email: </h2>
                    <div>
                        <p className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>allergycenterkandy@gmail.com</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>Phone: </h2>
                    <div>
                        <p className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>+94-81-3838-767</p>
                        <p className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>+94-76-8246-914</p>
                        
                    </div>
                </div>

        
        </div>

    </div>
    );
}

export default CalendarApp;