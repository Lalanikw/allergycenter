import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Doctor = () => {
    return (
      <div className=''>
        <div className='lg:flex-row lg:mt-[1px] md:mt-[2px] sm:mt-[1px] '>
          
          <div className='p-10 text-justify'>
            <div className="gradient-line"></div>
                  <div>
                      <h1 className='text-blueToRed-400 text-[20px] lg:text-xl md:text-md sm:text-md font-semibold'>Meet Dr. Thilanka</h1>
                      <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>MBBS (Sri Lanka), MD (Paediatrics), MRCP(UK)</h2>
                      <p className='pt-2'>Dr. Thilanka Senaviratne is a Senior Lecturer and Head of the Department of Pharmacology at the Faculty of Medicine, Peradeniya. With an extensive background in paediatrics, holds an MD in Pediatrics, a Diploma in Health, and the prestigious MRCP(UK). Her research interests focus on paediatric allergy and asthma, clinical pharmacology, and simulation-based medical education. 

                          <br></br><br></br>Dr. Thilanka Senaviratne is actively involved in several professional associations, holding leadership roles such as Social Secretary of the Sri Lanka Association of Clinical Pharmacology and Therapeutics (SLACPT) and Vice President of the Sri Lanka Association of Healthcare Simulations (SLASH). She is committed to advancing medical education and healthcare through her active involvement in both local and international organizations.</p>
                  </div>

                    <Link href="/Appointments"><Button
                      className="p-2 text-md justify-end bg-red-600 text-white"
                    > Meet Dr. Thilanka </Button> </Link>
              </div>
          </div>
      </div>
    );
}

export default Doctor;
