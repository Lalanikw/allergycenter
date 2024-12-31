import React, { useState } from 'react';
import { Input } from "./ui/input";
import { User } from 'lucide-react';

const PatientName = ({ patientName, setPatientName }) => {
  const [nameError, setNameError] = useState('');

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setPatientName(name);
    
    if (!validateName(name)) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
  };

  return (
    <div>
      <div className='pt-5'>
        <p className='flex gap-3 items-center pb-2'>
          <User className='text-[#0C4A6E]' />
          Enter Patient Name
        </p>
        <Input
          type="text"
          placeholder="Enter patient's full name"
          value={patientName}
          onChange={handleNameChange}
          className={`w-full ${nameError ? 'border-red-500' : 'border-[#0C4A6E]'}`}
        />
        {nameError && (
          <p className="text-red-500 text-sm mt-1">{nameError}</p>
        )}
      </div>
    </div>
  );
};

export default PatientName;