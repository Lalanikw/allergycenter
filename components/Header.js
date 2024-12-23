"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import "./Nav.css";

function Header() {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname(); // Get the current path

  return (
    <nav className="flex justify-between bg-blue-100 h-20">
      <div className="flex gap-3">
        <div className="absolute -top-1 z-20 p-2">
          <Link href="/" passHref>
            <Image src="/fulllogo.jpg" alt="fullLogo" width={300} height={100} />
          </Link>
        </div>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <ul className="flex gap-8 items-center text-blueToRed-400">
          <li
            className={`text-[20px] transition-all ease-in-out cursor-pointer lg:text-xl md:text-xl sm:text-lg font-semibold hover:text-[#FF0000] ${
              pathname === "/" ? "text-[#FF0000]" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`text-[20px] cursor-pointer lg:text-xl md:text-xl sm:text-lg font-semibold hover:text-[#FF0000] ${
              pathname === "/Services" ? "text-[#FF0000]" : ""
            }`}
          >
            <Link href="/Services">Services</Link>
          </li>
          <li
            className={`text-[20px] cursor-pointer lg:text-xl md:text-xl sm:text-lg font-semibold hover:text-[#FF0000] ${
              pathname === "/Appointments" ? "text-[#FF0000]" : ""
            }`}
          >
            <Link href="/Appointments">Book an Appointment</Link>
          </li>
          <li
            className={`text-[20px] cursor-pointer lg:text-xl md:text-xl sm:text-lg font-semibold hover:text-[#FF0000] ${
              pathname === "/ContactUs" ? "text-[#FF0000]" : ""
            }`}
          >
            <Link href="/ContactUs">Contact Us</Link>
          </li>
        </ul>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden lg:hidden relative text-blueToRed-400">
        {!toggle ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            onClick={() => setToggle(true)}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer text-blue-800 float-right"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            onClick={() => setToggle(false)}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer text-blue-800 float-right"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {toggle ? (
          <ul
            className="gap-8 items-center mt-12 bg-blue-200 p-1 z-50 fixed top-5 right-0 w-50%"
            style={{ zIndex: 1000 }}
          >
            <li
              className={`p-3 text-[18px] font-semibold text-black-100 transition-all ease-in-out cursor-pointer hover:text-[#FF0000] ${
                pathname === "/" ? "text-[#FF0000]" : ""
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`p-3 text-[18px] font-semibold text-black-100 cursor-pointer hover:text-[#FF0000] ${
                pathname === "/Services" ? "text-[#FF0000]" : ""
              }`}
            >
              <Link href="/Services">Services</Link>
            </li>
            <li
              className={`p-3 text-[18px] font-semibold text-black-100 cursor-pointer hover:text-[#FF0000] ${
                pathname === "/Appointments" ? "text-[#FF0000]" : ""
              }`}
            >
              <Link href="/Appointments">Appointments</Link>
            </li>
            <li
              className={`p-3 text-[18px] font-semibold text-black-100 cursor-pointer hover:text-[#FF0000] ${
                pathname === "/ContactUs" ? "text-[#FF0000]" : ""
              }`}
            >
              <Link href="/ContactUs">Contact Us</Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;
