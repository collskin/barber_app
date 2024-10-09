"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../public/sale-logo.svg";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import "./css/about.css";

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
      <div className="about-container">
        <div className="about-flex" id="about">
          <Image
            src={logo}
            alt={""}
            className="rounded-md mr-5 border-2 border-cyan-50"
          />
          <div className=" ml-5 about-margin ">
            <h2 className="text-9xl italic mb-4 about-title">O nama</h2>
            <p className="text-lg max-w-md mb-8 about-text">
              Zakoračite u naš salog, gde stil cveta od 1997. Naši vešti
              frizeri spajaju klasične tehnike sa urbanim stilom, praveći
              frizure koje definišu vašu individualnost. Od vanvremenske
              sofisticiranosti do savremene ivice, krojimo svaki kroj tako da
              odgovara vašoj jedinstvenoj ličnosti. Sa preciznošću i strašću,
              spajamo tradiciju i inovaciju kako bismo stvorili izgled koji je
              jedinstven za vas. Doživite savršen spoj šarma stare škole i
              moderne sofisticiranosti u našem salonu. Vaše putovanje do
              izuzetnog stila počinje ovde.
            </p>
            <button
              className="rounded-md p-1 bg-secondary-grey-bg text-2xl w-48 h-12 mb-16"
              onClick={handleBook}
            >
              ZAKAŽI
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
