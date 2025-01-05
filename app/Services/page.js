import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="flex">
      
          <div className="w-full md:w-2/3 p-5">
      <h1 className='text-blueToRed-400 text-[20px] lg:text-2xl md:text-xl sm:text-lg font-semibold pt-8'>Our Locations</h1>
      
      <div className="flex justify-between pt-4">
          <div >
                <h2 className='bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm font-bold'>Aloka Diagnostics </h2>
                <p className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'>No 673, Williamgopallawa Mawatha, Kandy.</p>
          </div>

        </div>
      

            <p className="pt-5 text-justify">Welcome to <strong>Allergy Center:</strong> We provide specialized diagnostic and treatment services for a wide range of allergies. Our expert team is dedicated to helping you manage and alleviate symptoms related to respiratory, skin, food, and drug allergies, as well as offering advanced treatments like immunotherapy. Whether you`re dealing with seasonal allergies, asthma, or food sensitivities, we are here to offer personalized care to improve your quality of life. Explore our services and take the first step toward better health today!</p>
            <Button
        className="pt-2 text-md justify-end bg-red-600 text-white"><Link href='/Appointments'>
          Book an Appointment
              </Link>
              
            </Button>
          </div>

          <div className="p-5 hidden sm:block">
            <Image className="rounded-full" src="/about.jpg" alt="femaledoc" width={300} height={300}/>
          </div>
      
      </div>

      <div className="p-2">

            <h1 className='pt-1 font-semibold text-center text-blueToRed-400 text-[20px] lg:text-2xl md:text-xl sm:text-md'> Our Main Services Categories</h1>
            <div className="gradient-line"></div>

        <div className="flex flex-col gap-4 p-1 pt-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-1/2">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 
  hover:shadow-lg hover:scale-110 transition-all duration-300">
                          <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Respiratory Allergies</h1>
                      <p className="leading-relaxed mb-2">These allergies affect the airways and breathing. Asthma, one of the most common respiratory allergies, causes wheezing, and tightness in the chest. Allergic rhinitis, also known as hay fever, leads to symptoms like headaches, and sneezing, caused by exposure to airborne allergens. </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 ">
                      <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                          <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Skin Allergies</h1>
                      <p className="leading-relaxed mb-2">Skin allergies manifest as itching, redness, hives, and eczema, which can cause discomfort and disrupt daily life. Common triggers include allergens in the environment, certain foods, or irritants such as soaps and detergents. Treatment focuses on alleviating discomfort and managing flare-ups effectively.</p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 ">
                      <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                          <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Food Allergies</h1>
                      <p className="leading-relaxed mb-2">Food allergies can cause a variety of symptoms, including abdominal pain, discomfort (dyspepsia), and irritable bowel syndrome. Common allergens include dairy, nuts, eggs, and shellfish. Managing food allergies often involves avoiding triggers and using medication to manage reactions.</p>
                      </div>
                  </div>
                    <div className="w-full md:w-1/2 ">
                      <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                          <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Gastritis of Allergic Origin</h1>
                      <p className="leading-relaxed mb-2">This condition is characterized by inflammation of the stomach lining due to an allergic reaction. Symptoms include stomach pain, bloating, and nausea. It is often triggered by food allergens, and treatment involves managing the allergic response and reducing inflammation.</p>
                      </div>
                    </div>
                </div>
          
                <div className="flex flex-col md:flex-row gap-3">
                      <div className="w-full md:w-1/4 ">
                          <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Drug Allergies</h1>
              <p className="leading-relaxed mb-2">Drug allergies occur when the immune system reacts negatively to certain medications, such as antibiotics, NSAIDs, or pain relievers. Symptoms can range from mild rashes to severe anaphylactic reactions. Avoidance of the trigger medication is key, along with emergency treatment if needed.
                </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Anaphylaxis / Angioedema</h1>
              <p className="leading-relaxed mb-2">Anaphylaxis is a severe, life-threatening allergic reaction that affects multiple parts of the body, including the throat, airways, and skin. Angioedema is the swelling of deeper layers of the skin, typically around the eyes, lips, or throat. Both conditions require medical attention and often involve an epinephrine injection.
                </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Drug Allergy Desensitisation</h1>
              <p className="leading-relaxed mb-2">Drug allergy desensitization is a treatment approach for patients who are allergic to certain medications. It involves gradually administering small amounts of the drug in increasing doses to help the body build a tolerance and prevent severe allergic reactions. This process should only be performed under medical supervision.
                </p>
                        </div>
                    </div>
                      <div className="w-full md:w-1/4 ">
                        <div className="p-3 text-justify rounded-lg shadow-md bg-gradient-to-br from-red-100 via-blue-100 to-blue-100 hover:scale-110 transition-all duration-300">
                            <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Immunotherapy</h1>
              <p className="leading-relaxed mb-2">Immunotherapy, also known as allergy shots, is a long-term treatment aimed at reducing the severity of allergic reactions. It involves gradually exposing the body to small amounts of the allergen to help the immune system build a tolerance over time. This treatment is often used for pollen, pet dander, and other common allergens.
                </p>
                        </div>
                      </div>
                  </div>
        </div>

        <Button
          className="pt-2 text-md justify-end bg-red-600 text-white"><Link href='/Appointments'>
            Book an Appointment
          </Link>
        </Button>

      </div>

      <div>
        {/* FAQs */}
              <div className="p-5 text-justify ">
                  <div className="gradient-line"></div>

                  <div className="pt-5">
                    <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">What types of allergies do you diagnose and treat? </h1>
                    <p className="leading-relaxed mb-2">We provide comprehensive diagnosis and treatment for various allergies, including respiratory allergies (like asthma and hay fever), skin allergies (such as eczema and hives), food allergies, drug allergies, and more. We also offer specialized services like allergy desensitization and immunotherapy.</p>
                  </div>
                  
                  <div className="pt-2">
                        <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">How can I schedule an appointment at the Allergy Center? </h1>
                        <p className="leading-relaxed mb-2">You can easily schedule an appointment by visiting our website and using the online booking system, or by calling our office directly. Our team will assist you in choosing the best available time for your consultation.</p>
                  </div>
                  
                  <div className="pt-2">
                        <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">What should I expect during my first visit?  </h1>
                        <p className="leading-relaxed mb-2">During your first visit, our allergist will review your medical history, discuss your symptoms, and conduct necessary tests such as skin prick tests or blood tests to identify your allergens. Based on the results, a personalized treatment plan will be developed.</p>
                  </div>
                  
                  <div className="pt-2">
                        <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">Are allergy treatments covered by insurance? </h1>
                        <p className="leading-relaxed mb-2">Most allergy treatments, including testing and medications, are covered by many insurance plans. We recommend contacting your insurance provider for specific coverage details. Our team is happy to assist with any billing questions and help with insurance claims.</p>
                  </div>
                  
                  <div className="pt-2">
                        <h1 className="font-semibold mb-1 bg-gradient-to-t from-[#0C4A6E] to-[#FF0000] bg-clip-text text-transparent lg:text-md md:text-sm sm:text-sm">What is immunotherapy and how does it work? </h1>
                        <p className="leading-relaxed mb-2">Immunotherapy, commonly known as allergy shots, is a long-term treatment that helps reduce the severity of allergic reactions. It works by gradually exposing your immune system to small doses of allergens, helping to build tolerance and decrease allergic responses over time.</p>
                </div>
                
                </div>

      </div>

    </div>
  );
}