"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const servicesList = [
  { name: "Haircut", price: "800 RSD" },
  { name: "Haircut + Beard Trim", price: "1200 RSD" },
  { name: "Beard Trim", price: "800 RSD" },
  { name: "Haircut + Washing Hair", price: "1000 RSD" },
];

const ServicesPage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (serviceName: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceName)
        ? prevSelected.filter((name) => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };

  const handleConfirmServices = () => {
    router.push("/select-date");
  };

  return (
    <div className="min-w-full min-h-screen bg-black p-8 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-6">Select Services</h1>
      <form>
        {servicesList.map((service) => (
          <div key={service.name} className="flex items-center mb-4">
            <input
              type="checkbox"
              id={service.name}
              name={service.name}
              checked={selectedServices.includes(service.name)}
              onChange={() => handleCheckboxChange(service.name)}
              className="mr-4"
            />
            <label htmlFor={service.name} className="flex-1 text-lg">
              {service.name} - {service.price}
            </label>
          </div>
        ))}
      </form>
      <button
        className="min-w-56 min-h-10 bg-secondary-grey-bg rounded-md mt-4"
        onClick={handleConfirmServices}
      >
        Confirm
      </button>
    </div>
  );
};

export default ServicesPage;
