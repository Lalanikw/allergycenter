"use client"

import Image from 'next/image';
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link'

const Hero = () => {
    return (
        <div className='overflow-hidden'>
            <div
            className="w-full h-96 md:bg-contain sm:bg-contain bg-no-repeat opacity-80"
            style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", marginTop:0 }}
                >
                {/* Button positioned at the bottom-right */}
                {/* <Button
        className="text-2xl p-5 absolute top-96 right-10 bg-red-600 text-white"
      ><Link href='/Appointments'> Book an Appointment</Link>
      </Button> */}
        </div>
            </div>
    );
}

export default Hero;

