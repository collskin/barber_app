"use client"; // Ensure client-side rendering for this component

import './style.css'
import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import SelectionCard from "@/components/SelectionCard";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { CustomCalendar } from '@/components/CustomCalendar';
import { formatDate } from '../data';

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
  const clientEmail = searchParams.get('email')
  const router = useRouter();

  const onChange = (date: Dayjs) => {
    setSelectedDate(date.toDate());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await axios.get('api/get-available?date=' + formatDate(selectedDate) + '&barberName=' + barberName)
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
        clientEmail,
        barberName,
        services: ids?.split(','),
        time: selectedTime,
        date: formatDate(selectedDate)
      })

      if (resp.status == 200) {
        toast.success('Zahtev je uspešno poslat, potvrda termina će stići na Vašu e-mail adresu.', { onClose: () => router.push("/") })
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Došlo je do greške.')
    }

  }

  return (
    <div className="date-page-container">
      <ToastContainer />
      <ClipLoader
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
          <CustomCalendar
            onChange={onChange}
          />
        </div>
        <SelectionCard takenTime={takenTime} barber={barberName} ids={searchParams.get('ids')?.split(',')} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </div>
      {selectedTime && <button
        className="min-w-56 min-h-10 bg-secondary-grey-bg rounded-md mt-4 confirm-button"
        onClick={handleSubmit}
      >
        <FontAwesomeIcon
          icon={faCheck}
          size="sm"
          color='white'
          style={{ height: '1.3rem' }}
          className="align-middle"
        />
        <p>Potvrdi</p>
      </button>}
    </div>
  );
};

export default DatePickerPage;
