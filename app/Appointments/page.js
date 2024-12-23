"use client"

import { Button } from "../../components/ui/button";
import CalendarApp from "../../components/CalendarApp"

export default function page() {
  return (
    <div className="pt-10" >
      <h1 className='p-5 font-semibold text-[#0C4A6E] text-[20px] lg:text-xl md:text-lg sm:text-md'>Schedule an Appointment</h1>
      
      <div className="pt-5 text-[#0C4A6E]">

              <CalendarApp className="" />
      </div>


    </div>
  );
}