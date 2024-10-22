import React from "react";
import Header from "../components/header";
import Prices from "@/components/Prices";
import Contact from "@/components/Contact";
import { About } from "../components/About";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { ToastContainer } from "react-toastify";
config.autoAddCss = false; // Tell FontAwesome to skip adding the CSS automatically since it's already imported
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className=" min-w-full min-h-screen">
      <ToastContainer />
      <Header />
      <About />
      <Prices />
      <Contact />
    </main>
  );
}
