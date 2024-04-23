"use client";
import { useState } from "react";

export default function Home() {
  const [hamburger, setHamburger] = useState(false);
  const toggle = (hamburger: boolean) => {
    setHamburger(!hamburger);
  };
  return (
    <main>
      <nav className="flex flex-wrap items-center justify-between p-2 bg-[#fdd000]">
        <div className="flex lg:hidden">
          <button onClick={() => toggle(hamburger)}>
            {hamburger ? (
              <img
                src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
                width="40"
                height="40"
              />
            ) : (
              <img
                src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
                width="40"
                height="40"
              />
            )}
          </button>
        </div>
        <ul
          className={`w-full mx-auto lg:flex text-right text-bold mt-2 md:mt-0 md:border-none space-x-4 md:justify-center ${
            hamburger ? "" : "hidden"
          }`}
        >
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Desktop
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Laptop
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              PC
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Printer
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Storage
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Monitor
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Gaming
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Speaker
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Accessories
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Software
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Networking
            </a>
          </li>
          <li className="bg-[#091235] cursor-pointer max-lg:border-b max-lg:py-2 text-white border border-black font-medium mb-2 px-1 py-0 rounded-md">
            <a className="block md:inline-block bg-[#091235] text-white font-sans font-medium hover:opacity-50 px-1 sm:py-1 md:border-none">
              Gadget
            </a>
          </li>
        </ul>
      </nav>
      <section className="text-black py-32 h-[65vh]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Build Your Dream PC
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Customize your gaming rig or workstation with ease.
          </p>
          <a
            href="#"
            className="bg-[#091235] hover:opacity-50 text-white font-semibold px-6 py-3 rounded"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
