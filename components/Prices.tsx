'use client'

import React, { useEffect, useState } from "react";
import './css/prices.css'
import { IServiceResponse } from "@/app/admin/types";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Prices = () => {

  const [services, setServices] = useState<IServiceResponse[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await axios.get('api/services')
        setServices(resp.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        alert('Greška pri učitavanju podataka.')
      }

    }
    fetchData()

  }, [])

  return (

    <div className="prices-container" id="services" >
      <ClipLoader
        loading={loading}
        color={"#5a7691"}
        cssOverride={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 1,
        }}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className=" prices-wrapper min-w-full flex justify-center items-center min-h-full px-20">
        <div className="prices-limiter w-1/2">
          <h2 className="text-7xl  mb-4 prices-title" style={{ color: 'white' }}>Usluge</h2>
          <div className="flex flex-col min-w-full  " >
            <div className="min-w-full">
              {services?.map(s => <div key={s._id} className="flex items-center mb-4 prices-flex">
                <div className="w-[50%]"><p style={{ color: 'white' }}>{s.name}</p></div>
                <div className="w-full bg-white h-1"></div>
                <div className="w-1/3 text-right"><p style={{ color: 'white' }}>{s.price} RSD</p> </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Prices;
