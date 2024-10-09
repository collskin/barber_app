"use client";
import React, { useEffect, useRef, useState } from "react";
import './css/prices.css'
import { motion, useAnimation } from "framer-motion";


const Prices = () => {
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
      <div className="prices-container" id="services" >
        <div className=" prices-wrapper min-w-full flex justify-center items-center min-h-full px-20">
          <div className="prices-limiter w-1/2">
            <h2 className="text-7xl  mb-4 prices-title">Usluge:</h2>
            <div className="flex flex-col min-w-full">
              <div className="min-w-full">
                <div className="flex items-center mb-4">
                  <div className="w-[50%]">Šišanje</div>
                  <div className="w-full bg-white h-1"></div>
                  <div className="w-1/3 text-right">800 RSD</div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-[50%]">Šišanje + Brijanje brade</div>
                  <div className="w-full bg-white h-1"></div>
                  <div className="w-1/3 text-right">1200 RSD</div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-[50%]">Brijanje brade</div>
                  <div className="w-full bg-white h-1"></div>
                  <div className="w-1/3 text-right">800 RSD</div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-[50%]">Šišanje + Pranje kose</div>
                  <div className="w-full bg-white h-1"></div>
                  <div className="w-1/3 text-right">00 RSD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Prices;
