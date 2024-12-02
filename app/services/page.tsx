"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/Input";
import './style.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IServiceResponse } from "../admin/types";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import SelectionCard from "@/components/SelectionCard";
import { CustomCalendar } from "@/components/CustomCalendar";
import { Dayjs } from "dayjs";
import { formatDate, getNextWorkdayDate, isBeforeNov } from "../data";

const ServicesPage = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [services, setServices] = useState<IServicesCheckbox[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(getNextWorkdayDate());
  const [selectedTime, setSelectedTime] = useState<string[]>()
  const [takenTime, setTakenTime] = useState<string[]>([])
  const barberName = searchParams.get('barber')

  const onChange = (date: Dayjs) => {
    if (isBeforeNov(date.toDate())) {
      return
    }
    setSelectedDate(date.toDate());
  };



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await axios.get('api/services')
        setServices(resp.data.map((r: IServiceResponse) => ({ ...r, checked: false })))
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        alert('Greška pri učitavanju podataka.')
      }

    }
    fetchData()

  }, [])

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
        alert('Greška pri učitavanju podataka')
      }

    }
    fetchData()

  }, [selectedDate])


  const handleSubmit = async () => {

    if (!selectedTime?.length) {
      toast.error('Termin mora biti odabran.')
      return
    }

    if (!name || !phone || !email || !services.length) {
      toast.error('Svi podaci moraju biti uneti.')
      return
    }

    setLoading(true)
    try {
      const resp = await axios.post('api/make_appointment', {
        clientName: name,
        clientPhone: phone,
        clientEmail: email,
        barberName,
        services: services.filter(s => s.checked).map(s => s._id),
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

  const handleCheckboxChange = (serviceId: string) => {
    setSelectedTime([])
    setServices(prev => {
      const copy = structuredClone(prev)
      return copy.map(s => {
        if (s._id == serviceId) {
          s.checked = !s.checked
        } else {
          s.checked = false
        }
        return s
      })
      const index = copy.findIndex(s => s._id == serviceId)
      copy[index].checked = !copy[index].checked
      return copy
    })
  };

  return (

    <div className="min-w-full min-h-screen  p-8 flex justify-center items-center flex-col services-container">
      <ClipLoader
        loading={loading}
        color={'#1c2434'}
        cssOverride={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50% -50%)",
          opacity: 1,
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 services-title " style={{ color: 'white' }}>Ostavite podatke i odaberite usluge</h1>
      <p style={{ color: 'white', textAlign: 'center' }} >Za dodatne termine pozvati na broj: +381 64 11 52 273</p>
      <div className="services-wrapper" >
        <div className="services-info" >
          <Input placeholder="Unesite vase ime" value={name} type="text" label="Ime" onChange={(e: any) => setName(e.target.value)} />
          <Input placeholder="Unesite vas kontakt telefon" value={phone} type="tel" label="Telefon" onChange={(e: any) => setPhone(e.target.value)} />
          <Input placeholder="Unesite vas e-mail" value={email} type="mail" label="E-mail" onChange={(e: any) => setEmail(e.target.value)} />
          {services.map((service) => (
            <div key={service.name} className="flex items-center ">
              <input
                type="checkbox"
                id={service.name}
                name={service.name}
                checked={service.checked}
                onChange={() => handleCheckboxChange(service._id)}
                className="mr-4 web-checkbox"
              />
              <label htmlFor={service.name} className="flex-1 text-lg" style={{ color: 'white' }}>
                {service.name} - {service.price}
              </label>
            </div>
          ))}
        </div>
        <div className="services-dates" >
          <div className="flex justify-center items-center date-flex  " >
            <div className="flex justify-center flex-col mr-5 calendar-container" >
              <CustomCalendar
                onChange={onChange}
              />
            </div>
            <SelectionCard loading={loading} date={selectedDate} services={services} takenTime={Array.isArray(takenTime) ? takenTime : []} barber={barberName} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
        </div>
      </div>
      <button
        className="button"
        onClick={handleSubmit}
      >
        Pošalji
      </button>
    </div>
  );
};

export interface IServicesCheckbox extends IServiceResponse {
  checked: boolean
}

export default ServicesPage;

