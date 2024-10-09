'use client'

import {
  faClock,
  faMoneyBill,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import TimeCard from "./TimeCard";
import { generateTimeSlots, servicesList } from "@/app/data";


const SelectionCard = ({ selectedTime, setSelectedTime, barber, ids, takenTime }: any) => {


  const timeSlots = generateTimeSlots();

  return (
    <div
      className="border-2 ml-5 rounded-md final-container"
    >
      <div className="flex items-center ml-2 mt-2">
        <p className="text-md text-center">
          <FontAwesomeIcon
            icon={faUser}
            size="sm"
            className="align-middle"
          />
          <span>  </span>
          {barber == 'sasa' ? 'Sasa Vuckovic' : 'Danijel Maksimovic'}
        </p>
      </div>
      <div className="flex items-center ml-2">
        <p className="text-md text-center">
          <FontAwesomeIcon
            icon={faMoneyBill}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 0 }}
          />
          <span>  </span>
          {servicesList.filter(s => ids.some((id: number) => id == s.id)).reduce((acc, s) => acc + s.price, 0)} RSD -
          <span>  </span>
          <FontAwesomeIcon
            icon={faClock}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 1 }}
          />
          <span>  </span>
          {selectedTime}
        </p>
      </div>
      {servicesList.filter(s => ids.some((id: number) => id == s.id)).map((s) => <div key={s.id} className="flex items-center ml-2 ">
        <p className="text-md text-center">
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
          <TimeCard taken={takenTime?.some((t: string) => t == time)} onClick={() => setSelectedTime(time)} active={selectedTime == time} key={index} time={time} />
        ))}
      </div>
    </div>
  );
};

export default SelectionCard;
