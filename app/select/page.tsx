"use client";
import React from "react";
import Image from "next/image";
import barber_one from "../../assets/barber_one.jpg";
import barber_two from "../../assets/barber_two.jpg";
import { useRouter } from "next/navigation";
import './style.css'

export default function SelectBarber() {
  const router = useRouter();

  const handleSelectBarber = (barber: string) => {
    router.push("/services?barber=" + barber);
  };

  return (
    <main className="min-w-full min-h-screen flex flex-col justify-center items-center barbers-container">
      <div className="pb-24 text-white text-2xl" style={{ color: 'white' }}>Odaberite frizera: </div>
      <div className="flex justify-between min-w-96 barbers-flex">
        <div className="barber-card" onClick={() => handleSelectBarber('Saša')}>
          <div className="barber-card__images" >
            <div className="dbc-select" >
              <h1 >Odaberi</h1>
            </div>
            <Image
              src={barber_one}
              alt=""
              className="cover-img"
            />
            <Image
              src={barber_one}
              alt=""
              className="circular-img"
            />
          </div>
          <h2 style={{ color: 'white' }}>Frizer Saša</h2>

        </div>

        <div className="barber-card" onClick={() => handleSelectBarber('danijel')}>
          <div className="dbc-select" >
            <h1>Odaberi</h1>
          </div>
          <div className="barber-card__images" >
            <Image
              src={barber_one}
              alt=""
              className="cover-img"
            />
            <Image
              src={barber_two}
              alt=""
              className="circular-img"
            />
          </div>
          <h2 style={{ color: 'white' }}>Frizer Danijel</h2>
        </div>
      </div>
    </main>
  );
}
