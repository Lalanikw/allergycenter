"use client"

import React, { useEffect, useState } from 'react';
import { Calendar } from "./ui/calendar"
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from "./ui/button";
import Image from 'next/image';

function CalendarApp() {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [bookedSlots, setBookedSlots] = useState({}); // to store blocked slots
    const [userPhone, setUserPhone] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    //Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); //Update every minute

        return () => clearInterval(timer);
    }, []);

    //update time slots whenever the data changes
    useEffect(() => {
        const day = getDayType(date); //determine the day type base on the 
        getTime(day);
    }, [date, currentTime]); //Adding time dependancy

    const getDayType = (date) => {
        const dayOfWeek = date.getDay(); // Sunday =0, Monday=1, ... Saturday =6
        if (dayOfWeek === 6) {
            return "Saturday"; //Saturday
        } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            return "Monday-Friday"; //Monday-Friday
        }
        return null; //No slots on Sunday or unsupported days
    };

    //Helper function to convert time string to Date object
    const timeStringToDate = (timeStr, baseDate) => {
        const [time, period] = timeStr.split('');
        const [hours, minutes] = time.split(':');
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

    //check if a time slot should be disabled
    const isSlotDisabled = (timeStr) => {
        const slotTime = timeStringToDate(timeStr, date);
        const oneHourBefore = new Date(slotTime.getTime() - 60 * 60 * 1000);

        //Disable if current time is less than one hour before the slot
        return currentTime >= oneHourBefore;
    };

    const getTime = (day) => {
        const timeList = [];

        //for Saturday (2-4pm)
        if (day === "Saturday") {
            for (let i = 2; i <= 3; i++) {
                ['00', '15', '30', '45'].forEach(minutes => {
                    const time = `${i}:${minutes} PM`;
                    timeList.push({
                        time,
                        disabled: isSlotDisabled(time)
                    });
                });
            }
        }
        //for Monday-Friday (4-6pm)
        else if (day === "Monday-Friday") {
            for (let i = 4; i <= 5; i++) {
                ['00', '15', '30', '45'].forEach(minutes => {
                    const time = `${i}:${minutes} PM`;
                    timeList.push({
                        time,
                        disabled: isSlotDisabled(time)
                    });
                });
            }
        }
        
        setTimeSlot(timeList)
    }

    const handleBooking = () => {

        //Save the booked slot
        const dateKey = date.toISOString().split("T")[0]; //Use date as the Key(ex: 2024-12-20 )
        setBookedSlots((prev) => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), selectedTimeSlot],
        }));


        if (!date || !selectedTimeSlot || !userPhone || !isValidLocalPhoneNumber(userPhone)) {
            alert("Please ensure all fields are valid before booking.");
            return;
        }

        // Format the phone number with the country code (+94 for Sri Lanka)
        let formattedPhone = userPhone.trim(); // Remove extra spaces
        if (formattedPhone.startsWith("0")) {
            formattedPhone = `+94${formattedPhone.slice(1)}`;// Replace leading 0 with +94
        } else if (!formattedPhone.startsWith("+94")) {
            formattedPhone = `+94${formattedPhone}`; // Add +94 if it's missing
        }
        
        //Validate the formatted phone number
        const phoneRegex = /^\+94\d{9}$/; //Matches +94 followed by 9 digits
        if (!phoneRegex.test(formattedPhone)) {
            alert("Invalid phone number. Please check and try again.");
            return;
        }

        // Construct the WhatsApp URL
        const message = `Hello, Your appoiment is confirmed on ${date.toDateString()} at ${selectedTimeSlot}.`;
        const whatsappURL = `https://api.whatsapp.com/send/?phone=${formattedPhone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

        console.log(whatsappURL);
        // Open WhatsApp for confirmation message
        window.open(whatsappURL, "_blank");

         

        //Clear selection after booking
        setSelectedTimeSlot(null);
        setUserPhone("");
    };

    const isSlotBooked = (slot) => {
        if (!date || !(date instanceof Date)) {
            console.log("Invalid Date detected in isSlotBooked.");
            return false; //default to 'not booked' if date in invalide
        }
        const dateKey = date.toISOString().split("T")[0];

        return bookedSlots[dateKey]?.includes(slot);
    };

    const isPastday = (day) => {
        const today = new Date();
        return day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
    };

    const sendWhatsAppMessage = (message, recipient) => {
    const url = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    };

    const isValidLocalPhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/; // Starts with '0' and is exactly 10 digits
        return phoneRegex.test(phone);
    };


    return (
    <div className='flex gap-36 justify-center'>

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
                            <div className='grid grid-cols-4 p-2 rounded-md border border-[#0C4A6E] gap-2  '>
                                {timeSlot?.length > 0 ? (
                                    timeSlot.map((item,index) => (
                                    <p
                                        key={index}
                                    onClick={() => !isSlotBooked(item.time) && !item.disabled && setSelectedTimeSlot(item.time)}
                    className={`p-1 border cursor-pointer text-center rounded-md ${
                        isSlotBooked(item.time) || item.disabled
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "hover:bg-[#0C4A6E] hover:text-white"
                    } ${
                        item.time === selectedTimeSlot &&
                        "bg-red-400 text-[#0C4A6E]"
                    }`}
                > {item.time} </p> ))
                                ) : (
                                <p className="col-span-3 text-center text-gray-500">
                        No available slots. </p>)}
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="mt-10">
                                <h2 className="flex gap-5 items-center text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold">
                                    Enter Your Phone Number
                                </h2>
                                <input
                                    type="text"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    placeholder="Enter your phone number (ex: 0701112222)"
                                            className="p-2 border rounded w-full mt-2"
                                            maxLength={15}
                                />
                            </div>

                            
                                
                    </div>

            </div>

            {/* button*/}
            <div>
                    
                    <div className='pt-5'>
                            <Button
                                type="button"
                                disabled={!(date && selectedTimeSlot && userPhone && isValidLocalPhoneNumber(userPhone))}
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
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
