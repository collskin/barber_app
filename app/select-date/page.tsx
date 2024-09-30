"use client"; // Ensure client-side rendering for this component
import React, { useState } from "react";
import { DatePicker, ConfigProvider, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "antd/dist/reset.css";
import SelectionCard from "@/components/SelectionCard";

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const onChange = (date: Dayjs | null, dateString: string | string[]) => {
    const formattedValue = date ? date.format("YYYY-MM-DD HH:mm") : null;
    console.log("Selected Time: ", formattedValue);
    setSelectedDate(date);
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div className="min-h-screen min-w-full bg-black justify-center flex items-center flex-col">
      <h2 style={{ marginRight: "35%" }}>Pick your time</h2>
      <div className="flex justify-center items-center" style={{ height: 350 }}>
        <div className="flex justify-center flex-col mr-5">
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            style={{ height: 300, width: 500 }}
            mode="month"
            value={undefined}
          />
        </div>
        <SelectionCard />
      </div>
    </div>
  );
};

export default DatePickerPage;
