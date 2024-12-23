import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const FrontServices = () => {
    return (
        <div className='bg-bluelight-50'>
            <div className="p-2">
                

                <h1 className='pt-5 font-semibold text-center text-blueToRed-400 text-[20px] lg:text-2xl md:text-xl sm:text-md'> Our Main Services Categories</h1>
                <div className="gradient-line"></div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:shadow-lg transition-shadow duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Respiratory Allergies</h1>
                        <p className="leading-relaxed mb-2">These allergies affect the airways and breathing. Asthma, one of the most common respiratory allergies, causes wheezing, and tightness in the chest. Allergic rhinitis, also known as hay fever, leads to symptoms like headaches, and sneezing, caused by exposure to airborne allergens. </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:shadow-lg transition-shadow duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Skin Allergies</h1>
                        <p className="leading-relaxed mb-2">Skin allergies manifest as itching, redness, hives, and eczema. Common triggers include allergens in the environment, certain foods, or irritants such as soaps and detergents. Treatment focuses on alleviating discomfort and managing flare-ups effectively.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:shadow-lg transition-shadow duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Food Allergies</h1>
                        <p className="leading-relaxed mb-2">Food allergies can cause a variety of symptoms, including abdominal pain, discomfort (dyspepsia), and irritable bowel syndrome. Common allergens include dairy, nuts, eggs, and shellfish. Managing food allergies often involves avoiding triggers and using medication to manage reactions.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:shadow-lg transition-shadow duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Gastritis of Allergic Origin</h1>
                        <p className="leading-relaxed mb-2">This condition is characterized by inflammation of the stomach lining due to an allergic reaction. Symptoms include stomach pain, bloating, and nausea. It is often triggered by food allergens, and treatment involves managing the allergic response and reducing inflammation.</p>
                        </div>
                    </div>
                </div>
                <div className='pt-2'>
                    <Button className="p-2 text-md bg-red-600 text-white"
                    ><Link href='/Services'> Explore Our Services </Link> </Button>
                </div>

            </div>
        </div>
    );
}

export default FrontServices;
