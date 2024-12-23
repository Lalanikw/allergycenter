import React from 'react';
import ContactForm from "./ContactForm"

const FrontContact = () => {
    return (
        <div className='pt-10'>
            <div className='font-medium '>
                <h1 className='pt-5 font-semibold text-center text-blueToRed-400 text-[20px] lg:text-2xl md:text-xl sm:text-md'>Have any questions? </h1>
                <h1 className='text-center pt-2 '>Just write us a message!</h1>
                <div className="gradient-line"></div>
            </div>
            <div className='w-1/2'>
                <ContactForm />
                </div>
        </div>
    );
}

export default FrontContact;
