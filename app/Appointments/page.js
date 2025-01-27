"use client"

import CalendarApp from "../../components/CalendarApp"
import Image from 'next/image';

export default function page() {
  return (
    <div className="pt-10" >
      <h1 className='p-5 font-semibold text-[#0C4A6E] text-[20px] lg:text-xl md:text-lg sm:text-md'>Schedule an Appointment</h1>
      
      <div className="flex flex-col md:flex-row pt-5 text-[#0C4A6E] justify-around">

        <CalendarApp className="p-5" />

        <div className="p-5 ">
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
              <p className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>+94-77-1418-699</p>
                    
                </div>
            </div>
        
        </div>
        
      </div>


    </div>
  );
}
