"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../public/sale-logo.svg";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

export const About = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0, backgroundColor: "#ffffff" }); // Start animation when component mounts
  }, [controls]);

  const handleBook = () => {
    router.push("/select"); // Use the URL path
  };

  return (
    <motion.div
      ref={ref}
      initial={{ x: "-100vw" }} // Initial position off-screen
      animate={controls}
      transition={{ type: "spring", duration: 1 }}
    >
      <div className=" min-h-screen flex bg-black">
        <div className="min-w-full flex justify-center items-center min-h-full px-20">
          <Image
            src={logo}
            alt={""}
            className="rounded-md mr-5 border-2 border-cyan-50"
          />
          <div className=" ml-5">
            <h2 className="text-9xl italic mb-4">About</h2>
            <p className="text-lg max-w-md mb-8">
              Step into Sasa Barber Shop, where style has thrived since 1997.
              Our skilled barbers blend classic techniques with urban flair,
              crafting haircuts that define your individuality. From timeless
              sophistication to contemporary edge, we tailor each cut to suit
              your unique personality. With precision and passion, we merge
              tradition and innovation to create a look that is uniquely you.
              Experience the perfect blend of old-school charm and modern
              sophistication at Sasa Barber Shop. Your journey to exceptional
              style begins here.
            </p>
            <button
              className="rounded-md p-1 bg-secondary-grey-bg text-2xl w-48 h-12 mb-16"
              onClick={handleBook}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
