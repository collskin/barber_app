'use client'

import { IServiceResponse } from "@/app/admin/types"
import axios from "axios"
import { CSSProperties, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

export const ServicesList = () => {

    const [services, setServices] = useState<IServiceResponse[]>([])
    const [loading, setLoading] = useState(false)


    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        color: '#1c2434'
    };


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

    return !services.length ? <ClipLoader
        loading={true}
        color='#1c2434;'
        cssOverride={override}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
    /> :

        <ul className="service-list">
            {services.map(s => <li key={s._id} className="service-item">
                <span className="service-name">{s.name}</span>
                <span className="service-price">{s.price}</span>
            </li>)}
        </ul>
}