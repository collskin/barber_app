"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, useAnimation } from "framer-motion";
import PinIcon from "../assets/pin.png";

const Contact = () => {
  const icon = L.icon({
    iconUrl: new URL("../assets/pin.svg", import.meta.url).href,
    iconSize: [30, 30],
    iconAnchor: [10, 30],
  });
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  useEffect(() => {
    const onScroll = () => {
      controls.start({ x: 0 }); // Start animation when user starts scrolling
      window.removeEventListener("scroll", onScroll); // Remove event listener after animation starts
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);
  return (
    <motion.div
      ref={ref}
      initial={{ x: "-100vw" }} // Initial position off-screen
      animate={controls}
      transition={{ type: "spring", duration: 1 }}
    >
      <div className="bg-black w-full min-h-screen">
        <h2 className=" text-9xl font-semibold mb-4 text-center pt-32">
          CONTACT
        </h2>
        <div className=" mt-16 flex bg-secondary-bg justify-center items-center min-w-full">
          <div className="flex justify-center  min-w-full">
            <div className="w-1/2 justify-end items-center flex bg-black pr-20 pl-22">
              <MapContainer
                style={{
                  width: "600px",
                  height: "400px",
                  borderRadius: "6px",
                }}
                center={[43.5836956, 21.3145159]}
                zoom={17}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  icon={icon}
                  position={[43.5836956, 21.3145159]}
                ></Marker>
              </MapContainer>
            </div>
            {/* Address */}
            <div className="w-1/2 bg-black pl-16">
              <div className="w-1/2 bg-black">
                <h2 className="text-4xl font-semibold mb-4">Address</h2>
                <p>Cara Lazara 182</p>
                <p>Kruševac, Serbia</p>
                <p>37000</p>
              </div>
              <div className="w-1/2 bg-black mt-14">
                <h2 className="text-4xl font-semibold mb-4">Phone number</h2>
                <p>+381 64 11 52 273</p>
              </div>
              <div className="w-1/2 bg-black mt-14">
                <h2 className="text-4xl font-semibold mb-4">Working time</h2>
                <p>Monday - Friday &nbsp; &nbsp; 08:30 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
