"use client";
import React from "react";
import './css/contact.css'
import Image from "next/image";
import location from "../public/location.png";
import { MapProvider } from "@/app/providers/map-provider";
import { MapComponent } from "./Map";

const Contact = () => {

  return (

    <div className="contact-container" id="contact" >
      <h2 className=" text-9xl font-semibold mb-4 text-center pt-32" style={{ color: 'white' }} >
        KONTAKT
      </h2>
      <div className=" mt-16 flex bg-secondary-bg justify-center items-center min-w-full">
        <div className="contact-flex">
          <div className="map-container" >
            <MapProvider>
              <MapComponent />
            </MapProvider>
          </div>
          {/* <div className="contact-img">
            <Image
              src={location}
              alt={""}
            />
          </div> */}
          {/* Address */}
          <div className="contact-info">
            <div className="w-1/2 bg-black">
              <h2 className="text-4xl font-semibold mb-4" style={{ color: 'white' }}>Adresa</h2>
              <p style={{ color: 'white' }}>Cara Lazara 182</p>
              <p style={{ color: 'white' }}>Kruševac, Serbia</p>
              <p style={{ color: 'white' }}>37000</p>
            </div>
            <div className="w-1/2 bg-black mt-14">
              <h2 className="text-4xl font-semibold mb-4" style={{ color: 'white' }}>Broj telefona</h2>
              <p style={{ color: 'white' }}>+381 64 11 52 273</p>
            </div>
            <div className="w-1/2 bg-black mt-14">
              <h2 className="text-4xl font-semibold mb-4" style={{ color: 'white' }}>Radno vreme</h2>
              <p style={{ color: 'white' }}>Ponedeljak - Petak &nbsp; &nbsp; 08:30 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
