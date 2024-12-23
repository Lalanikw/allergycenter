import Image from "next/image";
import Hero from "../components/Hero"
import Doctor from "../components/Doctor"
import FrontServices from "../components/FrontServices"
import FrontContact from "../components/FrontContact"

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Doctor />
      <FrontServices />
      
    </div>
  );
}
