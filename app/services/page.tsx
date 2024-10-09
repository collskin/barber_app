"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { objectToQueryParams, servicesList } from "../data";
import { Input } from "@/components/Input";
import './style.css'

const ServicesPage = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (serviceId: number) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleConfirmServices = () => {
    router.push("/select-date" + objectToQueryParams({ barber: searchParams.get('barber'), ids: selectedServices, name, phone }));
  };

  return (
    <div className="min-w-full min-h-screen bg-black p-8 flex justify-center items-center flex-col services-container">
      <h1 className="text-3xl font-bold mb-6 services-title "  >Ostavite podatke i odaberite usluge</h1>
      <form>
        <Input placeholder="Unesite vase ime" value={name} type="text" label="Ime" onChange={(e: any) => setName(e.target.value)} />
        <Input placeholder="Unesite vas kontakt telefon" value={phone} type="tel" label="Telefon" onChange={(e: any) => setPhone(e.target.value)} />
        <Input placeholder="Unesite vas e-mail" value={email} type="mail" label="E-mail" onChange={(e: any) => setEmail(e.target.value)} />
        {servicesList.map((service) => (
          <div key={service.name} className="flex items-center mb-4">
            <input
              type="checkbox"
              id={service.name}
              name={service.name}
              checked={selectedServices.includes(service.id)}
              onChange={() => handleCheckboxChange(service.id)}
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
        Dalje
      </button>
    </div>
  );
};

export default ServicesPage;
