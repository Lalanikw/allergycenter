import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Doctor = () => {
    return (
      <div className=''>
        <div className='lg:flex-row lg:mt-[1px] md:mt-[2px] sm:mt-[1px] '>
          
          <div className='p-5 text-justify'>
            <div className="gradient-line"></div>
                  <div>
                      <h1 className='text-blueToRed-400 text-[20px] lg:text-xl md:text-md sm:text-md font-semibold'>Dr. Thilanka Seneviratne</h1>
                      <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>MBBS, DCH, MD, MRCPCH(UK)</h2>
              
              <p className='pt-2 font-semibold'> Member of the Americal college of Asthma Allergy and Immunology (ACAAI).
                <br></br>Member of the European Academy of Asthma and Clinical Immunology (EAACI).</p>
              
              <p className='pt-2'> Dr. Thilanka Seneviratne is a senior lecturer and the Head of the Department of Pharmacology
                at the Faculty of Medicine, University of Peradeniya. With an extensive background in allergy and asthma,
                she is a member of the prestigious American College of Allergy, Asthma, and Immunology (ACAAI) as well as
                the European Academy of Allergy and Clinical Immunology (EAACI). Her research interests include allergy, asthma,
                clinical pharmacology, and simulation-based medical education. </p>
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
