"use client";
import React from "react";
import Image from "next/image";
import barber_one from "../../assets/barber_one.jpg";
import barber_two from "../../assets/barber_two.jpg";
import { useRouter } from "next/navigation";

export default function SelectBarber() {
  const router = useRouter();

  const handleSelectBarber = () => {
    router.push("/services");
  };

  return (
    <main className="min-w-full min-h-screen bg-black flex flex-col justify-center items-center">
      <div className="pb-24 text-white text-2xl">Choose your barber: </div>
      <div className="flex justify-between min-w-96">
        <div
          className="min-w-48 rounded-[8px] mr-7 flex flex-col justify-center items-center cursor-pointer bg-primary-grey-bg hover:bg-secondary-grey-bg transition-colors duration-300"
          onClick={handleSelectBarber}
        >
          <Image
            src={barber_one}
            alt=""
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              padding: "12px",
            }}
            className="object-cover"
          />
          <p className="text-white mt-3">Barber Sasa</p>
          <p className="text-white mt-7 mb-5">Select Barber</p>
        </div>
        <div
          className="min-w-48 rounded-[8px] mr-7 flex flex-col justify-center items-center cursor-pointer p-1 bg-primary-grey-bg hover:bg-secondary-grey-bg transition-colors duration-300"
          onClick={handleSelectBarber}
        >
          <Image
            src={barber_two}
            alt=""
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              padding: "8px",
            }}
            className="object-cover"
          />
          <p className="text-white mt-3">Barber Danijel</p>
          <p className="text-white mt-7 mb-5">Select Barber</p>
        </div>
      </div>
    </main>
  );
}
