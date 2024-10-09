'use client'
import './dashboard.css'
import { formatDateForInput, servicesList } from "../data";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Barber } from '../models/Barber';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faHeadSideCough, faPerson, faPersonArrowUpFromLine, faPersonBooth, faPhone, faScissors } from '@fortawesome/free-solid-svg-icons';
export default function Dashboard() {

    const [date, setDate] = useState<Date>(new Date())
    const [appointments, setAppointments] = useState<Barber[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const resp = await axios.get('/api/get-all?date=' + date.toLocaleDateString())
            setAppointments(resp.data)
            setLoading(false)

        }
        fetchData()
    }, [date])

    const handleConfirm = async (id: string) => {
        setLoading(true)
        try {
            await axios.patch('/api/confirm?id=' + id)
            setAppointments((prev: Barber[]) => {
                let copy = structuredClone(prev)
                const index = copy.findIndex(a => a._id == id)
                copy[index].confirmed = true
                return copy
            })
            toast.success('Termin uspesno potvrdjen')
            setLoading(false)
        } catch (error) {
            setLoading(false)

            toast.error('Doslo je do greske')

        }

    }

    const handleRemove = async (id: string) => {
        setLoading(true)

        try {
            await axios.delete('/api/delete/' + id)
            setAppointments((prev: Barber[]) => {
                let copy = structuredClone(prev)
                copy = copy.filter(a => a._id !== id)
                return copy
            })
            toast.success('Termin uspesno odbijen')
            setLoading(false)

        } catch (error) {
            toast.error('Doslo je do greske')
            setLoading(false)

        }

    }


    const renderRows = () =>
        appointments.length < 1 ? <h2 style={{ textAlign: 'center', color: "#fff", width: '100%' }} >Nema zahteva za ovaj datum</h2> : appointments.map((r, k) => {
            return (
                <div className='dashboard-card' >
                    <div className='dashboard-card__data' >
                        <h4>{r.clientName}</h4>
                        <p>
                            <FontAwesomeIcon
                                icon={faPhone}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0 }}
                            />
                            <span> </span>
                            {r.clientPhone}
                        </p>
                        <p>
                            <FontAwesomeIcon
                                icon={faClock}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0 }}
                            />
                            <span> </span>
                            {r.time}
                        </p>
                        <p>
                            <FontAwesomeIcon
                                icon={faPersonBooth}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0 }}
                            />
                            <span> </span>
                            {r.barberName == 'sasa' ? 'Sasa ' : 'Danijel '}
                        </p>



                        <p>
                            <FontAwesomeIcon
                                icon={faScissors}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0 }}
                            />:
                            <span> </span>
                            {servicesList.filter((s) => r.services.some(ss => ss == s.id)).map(s => <p>{s.name} {s.price}</p>)}
                        </p>
                        {r.confirmed && <p style={{ color: 'green' }} >
                            <FontAwesomeIcon
                                icon={faCheck}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0, color: 'green' }}
                            />
                            <span>  </span>
                            Potvrdjeno
                        </p>}



                    </div>
                    <div className='dashboard-card__options' >
                        {!r.confirmed && <div className="confirm" onClick={() => handleConfirm(r._id as string)}>
                            Potvrdi
                        </div>}
                        <div onClick={() => handleRemove(r._id as string)} className="remove">
                            X
                        </div>
                    </div>
                </div>
            );
        });

    return <div className="dashboard-container" >
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
        <ToastContainer />
        <p>Odaberite datum</p>
        <input value={formatDateForInput(date)} className='date-input' type="date" onChange={v => setDate(v.target.valueAsDate as Date)} />
        <div className='dashboard-list' >
            {renderRows()}
        </div>
    </div>
}