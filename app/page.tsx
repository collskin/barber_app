import React from "react";
import Header from "../components/header";
import Prices from "@/components/Prices";
import Contact from "@/components/Contact";
import { About } from "../components/About";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell FontAwesome to skip adding the CSS automatically since it's already imported

export default function Home() {
  return (
    <main className=" min-w-full min-h-screen">
      <Header />
      <About />
      <Prices />
      <Contact />
    </main>
  );
}
