import {
  faClock,
  faMoneyBill,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TimeCard from "./TimeCard";

const generateTimeSlots = (
  start: number,
  end: number,
  interval: number
): string[] => {
  const times: string[] = [];
  let current = start;

  while (current <= end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    times.push(time);
    current += interval;
  }

  return times;
};

const SelectionCard = () => {
  const startTime = 9 * 60; // 9:00 AM in minutes
  const endTime = 17 * 60 + 30; // 5:30 PM in minutes
  const interval = 30; // 30 minutes

  const timeSlots = generateTimeSlots(startTime, endTime, interval);

  return (
    <div
      className="border-2 ml-5 rounded-md"
      style={{ height: "300px", width: "500px" }}
    >
      <div className="flex items-center ml-2 mt-2">
        <p className="text-md text-center">
          {" "}
          <FontAwesomeIcon
            icon={faUser}
            size="sm"
            className="align-middle"
          />{" "}
          Sasa Vuckovic
        </p>
      </div>
      <div className="flex items-center ml-2">
        <p className="text-md text-center">
          <FontAwesomeIcon
            icon={faMoneyBill}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 0 }}
          />{" "}
          3200 RSD -{" "}
          <FontAwesomeIcon
            icon={faClock}
            size="sm"
            className="align-middle"
            style={{ marginBottom: 1 }}
          />{" "}
          1h
        </p>
      </div>
      <div className="flex items-center ml-2 ">
        <p className="text-md text-center">
          {" "}
          <FontAwesomeIcon
            icon={faShoppingBag}
            size="sm"
            className="align-middle"
          />{" "}
          Sisanje - 1000 RSD
        </p>
      </div>
      <div className="flex items-center ml-2">
        <p className="text-md text-center">
          {" "}
          <FontAwesomeIcon
            icon={faShoppingBag}
            size="sm"
            className="align-middle"
          />{" "}
          Brijanje - 2200 RSD
        </p>
      </div>
      <div className="w-full border-b-2 border-gray-300 my-2"></div>
      <div className="flex flex-wrap overflow-y-auto max-h-40">
        {timeSlots.map((time, index) => (
          <TimeCard key={index} time={time} />
        ))}
      </div>
    </div>
  );
};

export default SelectionCard;
