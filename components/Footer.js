import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='pt-10'>
            <div className="gradient-line"></div>
                <div className='flex justify-between'>
                    <div className='p-2'>
                        <Image src="/fulllogo.jpg" alt='fulllogo' width={100} height={50} />
                    </div>

                    <h1 className='text-blueToRed-400 lg:text-sm md:text-sm sm:text-sm font-semibold'>Copyright @ 2024. All rights reserved. </h1>
                </div>
            <div>

            </div>
        </div>
    );
}

export default Footer;
