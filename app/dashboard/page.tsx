'use client'
/*eslint-disable*/
import './dashboard.css'
import { formatDateForInput, generateTimeSlots, servicesList } from "../data";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Barber } from '../models/Barber';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCheck, faClock, faHeadSideCough, faPerson, faPersonArrowUpFromLine, faPersonBooth, faPhone, faPlus, faScissors } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { useRouter } from 'next/navigation';
export default function Dashboard() {

    const [date, setDate] = useState<Date>(new Date())
    const [appointments, setAppointments] = useState<Barber[]>([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [selectedServices, setSelectedServices] = useState([])
    const [availableTimes, setAvailableTimes] = useState<string[]>([])
    const router = useRouter();

    const [data, setData] = useState({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        barberName: 'Sasa',
        time: ''
    })

    const times = generateTimeSlots()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const resp = await axios.get('/api/get-all?date=' + date.toLocaleDateString())
            setAppointments(resp.data)
            const avTim = times.filter((t => !resp.data.some((d: any) => d.time == t)))
            setAvailableTimes(avTim)
            setData(prev => ({ ...prev, time: avTim[0] }))
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

    const handleChange = (e: any, name: string) => {
        setData(prev => {
            let copy: any = structuredClone(prev)
            copy[name] = e.target.value
            return copy
        })
    }

    const handleCheckboxChange = (serviceId: number) => {
        setSelectedServices((prevSelected: any) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id: any) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const obj = { ...data, date: date.toLocaleDateString(), services: selectedServices }
            const resp = await axios.post('api/make_appointment?confirmed=true', { ...obj })
            if (resp.status == 200) {
                console.log(resp.data)
                toast.success('Termin je uspesno zakazan')
                setLoading(false)
                //@ts-ignore
                appointments.push({ ...obj, confirmed: true, _id: resp.data.message.id })
                setModal(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Doslo je do greska.')
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
                                icon={faAt}
                                size="sm"
                                className="align-middle"
                                style={{ marginBottom: 0 }}
                            />
                            <span> </span>
                            {r.clientEmail}
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



                    </div>§
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
        <div className='dashboard-top' >
            <div>
                <p>Odaberite datum</p>
                <input value={formatDateForInput(date)} className='date-input' type="date" onChange={v => setDate(v.target.valueAsDate as Date)} />
            </div>
            <div className='dashboard-button' onClick={() => !loading && setModal(true)} >
                <FontAwesomeIcon
                    icon={faPlus}
                    size="sm"
                    className="align-middle"
                    style={{ marginBottom: 0 }}
                />
                <p>Zakazi termin</p>
            </div>
        </div>

        <div className='dashboard-list' >
            {renderRows()}
        </div>

        {modal && <div className='dashboard-modal' >
            <div className='dashboard-modal__container' >
                <div className='dbm-top'>
                    <p>Zakazivanje  {formatDateForInput(date)}</p>
                    <div onClick={() => setModal(false)} className="remove">
                        X
                    </div>
                </div>
                <div className='dbm-info' >
                    <Input border label='Ime' onChange={(e: any) => handleChange(e, 'clientName')} value={data.clientName} type='text' placeholder='Unesite ime' />
                    <Input border label='Telefon ' onChange={(e: any) => handleChange(e, 'clientPhone')} value={data.clientPhone} type='tel' placeholder='Unesite telefon' />
                    <Input border label='E-mail ' onChange={(e: any) => handleChange(e, 'clientEmail')} value={data.clientEmail} type='mail' placeholder='Unesite e-mail' />
                    <Select label='Frizer' onChange={(e: any) => handleChange(e, 'barberName')} options={(["Sasa", "Danijel"])} value={data.barberName} />
                    <Select label='Termin' onChange={(e: any) => handleChange(e, 'time')} options={availableTimes} value={data.time} />
                </div>
                <p style={{ display: 'block', color: '#101010', marginBottom: 10 }} > Usluge:</p>
                <div className='services-wrap' >
                    {servicesList.map((service) => (
                        <div key={service.name} className="flex items-center mb-4 flew-wrap ">
                            <input
                                type="checkbox"
                                id={service.name}
                                name={service.name}
                                // @ts-ignore
                                checked={selectedServices.includes(service.id)}
                                onChange={() => handleCheckboxChange(service.id)}
                                className="mr-2"
                            />
                            <label htmlFor={service.name} style={{ color: '#101010', fontSize: 15 }} className="flex-1 text-lg">
                                {service.name} - {service.price}
                            </label>
                        </div>
                    ))}
                </div>
                <div className='dashboard-confirm-container' >
                    <div className="confirm" onClick={() => handleSubmit()}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            size="sm"
                            className="align-middle"
                            style={{ marginBottom: 0 }}
                        />
                        <p style={{ marginLeft: 10 }} > Potvrdi</p>
                    </div>
                </div>

            </div>
        </div>}
    </div>
}