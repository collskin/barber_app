'use client'

import {
  faClock,
  faMoneyBill,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TimeCard from "./TimeCard";
import { generateTimeSlots, months } from "@/app/data";
import { IServicesCheckbox } from "@/app/services/page";
import { toast } from "react-toastify";


const SelectionCard = ({ selectedTime, setSelectedTime, barber, takenTime, services, date, loading }: any) => {

  const timeSlots = generateTimeSlots();

  const handleClick = (time: string) => {
    try {
      const arr: string[] = []
      const servicesTimes = services.filter((s: IServicesCheckbox) => s.checked).reduce((a: number, c: IServicesCheckbox) => a + c.slots, 0)
      const index = timeSlots.findIndex(t => t == time)
      for (let i = 0; i < servicesTimes; i++) {
        arr.push(timeSlots[index + i])
      }

      const lastIndex = index + servicesTimes - 1
      if (takenTime.some((t: string) => arr.includes(t)) || (!timeSlots[lastIndex])) {
        toast.warn(`Nema dovoljno slobodnih termina za sve Vaše odabrane usluge za koje je potrebno (${servicesTimes} termina.`)
        return
      }

      if (servicesTimes > 1 && arr.includes('13:00') && arr[arr.length - 1] !== '13:00') {
        toast.warn(`Trajanje Vaših odabranih usluga bi u odabranim termima (${arr[0]} - ${arr[arr.length - 1]}) ušlo u pauzu salona. Odaberite drugi termin`)
        return
      }
      setSelectedTime(arr)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div
      className="border-2 ml-5 rounded-md final-container"
      style={loading ? { pointerEvents: 'none' } : {}}
    >
      <div className="flex items-center ml-2 mt-2">
        <p className="text-md text-center " style={{ color: 'white' }}>
          <FontAwesomeIcon
            icon={faUser}
            size="sm"
            className="align-middle"
          />
          <span>  </span>
          {barber == 'Saša' ? 'Saša Vučković' : 'Danijel Maksimović'}
        </p>
      </div>
      <div className="flex items-center ml-2">
        <p className="text-md text-center" style={{ color: 'white' }}>
          <FontAwesomeIcon
            icon={faMoneyBill}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 0 }}
          />
          <span>  </span>
          {services?.filter((s: IServicesCheckbox) => s.checked).reduce((acc: number, s: IServicesCheckbox) => acc + (s.price as number), 0)} RSD -
          <span>  </span>
          <FontAwesomeIcon
            icon={faClock}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 1 }}
          />
          <span>  </span>
          {(date ? (date.getDate() + '. ' + months[date.getMonth()]) : '') + ' '}
        </p>
      </div>
      {services?.filter((s: IServicesCheckbox) => s.checked).map((s: IServicesCheckbox) => <div key={s._id} className="flex items-center ml-2 ">
        <p className="text-md text-center" style={{ color: 'white' }}>
          <FontAwesomeIcon
            icon={faShoppingBag}
            size="sm"
            className="align-middle"
          />
          <span>  </span>
          {s.name} - {s.price + ' RSD'}
        </p>
      </div>)
      }

      <div className="w-full border-b-2 border-gray-300 my-2"></div>
      <div className="flex flex-wrap overflow-y-auto max-h-40">
        {timeSlots.map((time, index) => (
          <TimeCard taken={takenTime?.some((t: string) => t == time)} onClick={() => handleClick(time)} active={selectedTime?.includes(time)} key={index} time={time} />
        ))}
      </div>
    </div>
  );
};

export default SelectionCard;
