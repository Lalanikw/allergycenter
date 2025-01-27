// PhonePicker.js
import React, { useState } from 'react';
import { Input } from "./ui/input";
import { Phone } from 'lucide-react';

const PhonePicker = ({ userPhone, setUserPhone }) => {
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+94|94|0)?[1-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  // Format the phone number to include +94 if necessary
  const formatPhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '');
    if (cleanPhone.startsWith('94')) return `+${cleanPhone}`;
    if (cleanPhone.startsWith('0')) return `${cleanPhone.slice(1)}`;
    return `${cleanPhone}`;
};


  // Handle changes in the phone number input
  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setUserPhone(phone); // Update raw input

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid Sri Lankan phone number');
    } else {
      setPhoneError('');
      setUserPhone(formatPhoneNumber(phone)); // Update formatted phone number
    }
  };

  return (
    <div>
       <div className='pt-5'>
                      <p className='flex gap-3 items-center pb-2'>
                        <Phone className='text-[#0C4A6E]' />
                        Enter Your Phone Number
                      </p>
        <Input
          type="text"
          placeholder="Enter your phone number (e.g., 0771234567)"
          value={userPhone}
          onChange={handlePhoneChange}
          className={`w-full ${phoneError ? 'border-red-500' : 'border-[#0C4A6E]'}`}
        />
                      {phoneError && (
                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                      )}
                  </div>
    </div>
  );
};

export default PhonePicker;
