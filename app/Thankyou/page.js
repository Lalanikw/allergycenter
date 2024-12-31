import Image from "next/image";

export default function ThankYou() {
  return (
    <div className="text-center mt-36 h-96">
      <h1 className='text-blueToRed-400 text-[20px] lg:text-sm md:text-sm sm:text-sm font-semibold'>Thank You!</h1>
          <p className="text-gray-600 mt-4">Your message has been sent. We will get back to you shortly!</p>
    </div>
  );
}
