import ContactForm from "../../components/ContactForm";


export default function page() {
  return (
    <div className=" mt-10 p-5">

        <div className="text-center">
          <p className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'>Your feedback matters! Feel free to leave a review, ask any questions, or send us a message.  </p>
          <p className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'>We will get back to you within 48hrs. </p>
      <p className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'>Thank you for your patience. Have a wonderfull day !  </p>  
      </div>
      
        <div className="w-2/3 ">

        <ContactForm />
        </div>
    </div>
  );
}

