"use client"; // Ensure client-side rendering for this component

import './style.css'
import React, { useEffect, useState } from "react";
import { DatePicker, ConfigProvider, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "antd/dist/reset.css";
import SelectionCard from "@/components/SelectionCard";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>()
  const [takenTime, setTakenTime] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')
  const barberName = searchParams.get('barber')
  const clientName = searchParams.get('name')
  const clientPhone = searchParams.get('phone')
  const router = useRouter();

  const onChange = (date: Dayjs) => {
    setSelectedDate(date.toDate());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await axios.get('api/get-available?date=' + selectedDate?.toLocaleDateString())
        setTakenTime(resp.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        alert('Greska pri ucitavanju podataka')
      }

    }
    fetchData()

  }, [selectedDate])


  const handleSubmit = async () => {
    setLoading(true)
    try {
      const resp = await axios.post('api/make_appointment', {
        clientName,
        clientPhone,
        barberName,
        services: ids?.split(','),
        time: selectedTime,
        date: selectedDate?.toLocaleDateString()
      })

      if (resp.status == 200) {
        toast.success('Zahtev je uspesno poslat, sacekajte potvrdu')
        setLoading(false)
        router.push("/")
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Doslo je do greska.')
    }

  }

  return (
    <div className="date-page-container">
      <RingLoader
        loading={loading}
        color={'#1c7aad'}
        cssOverride={{
          position: "fixed",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h2 style={{ marginRight: "35%" }}>Odaberite termin</h2>
      <div className="flex justify-center items-center date-flex  " >
        <div className="flex justify-center flex-col mr-5 calendar-container" >
          <Calendar
            fullscreen={false}
            mode="month"
            className='calendar'
            onChange={onChange}
          // value={undefined}
          />
        </div>
        <SelectionCard takenTime={takenTime} barber={barberName} ids={searchParams.get('ids')?.split(',')} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </div>
      {selectedTime && <button
        className="min-w-56 min-h-10 bg-secondary-grey-bg rounded-md mt-4"
        onClick={handleSubmit}
      >
        Potvrdi
      </button>}
    </div>
  );
};

export default DatePickerPage;
