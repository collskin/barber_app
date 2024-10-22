"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import {
    faAt,
    faChartBar,
    faCheck,
    faClock,
    faClose,
    faHome,
    faList,
    faPersonBooth,
    faPhone,
    faScissors,
    faTrash,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { MainAdmin } from "./pages/MainAdmin";
import { useState } from "react";
import { IAppointmentResponse } from "./types";
import { addZero, formatDate, months } from "../data";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { StatisticsAdmin } from "./pages/StatisticsAdmin";
import { ServicesAdmin } from "./pages/ServicesAdmin";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import useAuth from '../context/useAuth'


export default function Admin() {
    const [activePage, setActivePage] = useState('main')
    const [openDetails, setOpenDetails] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [data, setData] = useState<IAppointmentResponse>({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        barberName: "Saša",
        time: [],
        services: [],
        confirmed: false,
        date: formatDate(new Date()),
    });
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<IAppointmentResponse[]>([]);
    const [unconfirmed, setUnconfirmed] = useState<IAppointmentResponse[]>([]);
    const [date, setDate] = useState<Date>(new Date())
    const router = useRouter();
    //@ts-ignore
    const { token } = useAuth()

    if (!token) {
        router.push("/auth");
    }


    const handleConfirm = async (id: string) => {
        setLoading(true);
        try {
            await axios.patch("/api/confirm?id=" + id);
            const obj = unconfirmed.find(u => u._id == id)
            if ((new Date(obj?.date as string).getDate() === date.getDate() && new Date(obj?.date as string).getMonth() == date.getMonth())) {
                setAppointments((prev: IAppointmentResponse[]) => {
                    let copy = structuredClone(prev);
                    // @ts-ignore
                    copy.push({ ...obj, confirmed: true })
                    return copy;
                });
            }
            setUnconfirmed((prev: IAppointmentResponse[]) => {
                let copy = structuredClone(prev)
                copy = copy.filter(u => u._id !== id)
                return copy
            })
            toast.success("Termin uspesno potvrđen");
            setLoading(false);
            setOpenDetails(false)
        } catch (error) {
            setLoading(false);
            toast.error("Doslo je do greške.");
        }
    };

    const handleRemove = async (id: string, confirmed: boolean) => {
        setLoading(true);
        try {
            await axios.delete("/api/delete/" + id);

            if (confirmed) {
                setAppointments((prev: IAppointmentResponse[]) => {
                    let copy = structuredClone(prev);
                    copy = copy.filter((a) => a._id !== id);
                    return copy;
                });
            } else {
                setUnconfirmed((prev: IAppointmentResponse[]) => {
                    let copy = structuredClone(prev);
                    copy = copy.filter((a) => a._id !== id);
                    return copy;
                });
            }

            toast.success("Termin uspešno obrisan");
            setLoading(false);
            setOpenDetails(false)

        } catch (error) {
            toast.error("Doslo je do greške");
            setLoading(false);
        }
    };


    const renderPages = () => {
        if (activePage == 'main') {
            return <MainAdmin
                unconfirmed={unconfirmed}
                setUnconfirmed={setUnconfirmed}
                appointments={appointments}
                setAppointments={setAppointments}
                data={data}
                setData={setData}
                date={date}
                setDate={setDate}
                loading={loading}
                setLoading={setLoading}
                setOpenDetails={setOpenDetails}
            />
        } else if (activePage == 'statistics') {
            return <StatisticsAdmin setLoading={setLoading} />
        } else {
            return <ServicesAdmin setLoading={setLoading} />
        }
    }

    return (
        <div className="admin-container">
            <ClipLoader
                loading={loading}
                color={"#5d5ce5"}
                cssOverride={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 1,
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <ToastContainer />
            <div className="sidebar-toggle" >
                <FontAwesomeIcon
                    icon={faList}
                    size="sm"
                    style={{ height: '18px', color: '#5d5ce5' }}
                    onClick={() => setOpenSidebar(true)}
                />
            </div>
            <div className={"admin-sidebar" + (openSidebar ? ' open-sidebar' : '')}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} >
                    <h1>  Saša Barber</h1>
                    <FontAwesomeIcon
                        icon={faClose}
                        size="sm"
                        className="sidebar-x"
                        style={{ height: '18px', color: '#5d5ce5' }}
                        onClick={() => setOpenSidebar(false)}
                    />
                </div>
                <div className="sidebar-flex">
                    <p onClick={() => setActivePage('main')} className={activePage == 'main' ? 'active-sidebar' : ''} >
                        <FontAwesomeIcon icon={faHome} size="sm" className="align-middle" />
                        <span> </span>
                        TERMINI
                    </p>

                    <p onClick={() => setActivePage('services')} className={activePage == 'services' ? 'active-sidebar' : ''} >
                        <FontAwesomeIcon
                            icon={faScissors}
                            size="sm"
                            className="align-middle"
                        />
                        <span> </span>
                        USLUGE
                    </p>
                    <p onClick={() => setActivePage('statistics')} className={activePage == 'statistics' ? 'active-sidebar' : ''} >
                        <FontAwesomeIcon
                            icon={faChartBar}
                            size="sm"
                            className="align-middle"
                        />
                        <span> </span>
                        STATISTIKA
                    </p>
                </div>
            </div>
            {renderPages()}
            <div
                className={"admin-details" + (openDetails ? " details-open" : "")}
            >
                <div className="admin-details_upper">
                    <div className="admin-details-nav">
                        <h1>Pregled</h1>
                        <FontAwesomeIcon onClick={() => setOpenDetails(false)} icon={faX} size="sm" className="align-middle" />
                    </div>
                    <div className="order-details">
                        <h1>{data.clientName}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
                            <FontAwesomeIcon
                                icon={faClock}
                                size="sm"
                                className="align-middle"
                                style={{ color: '#858895' }}
                            />
                            <span> </span>
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <p>{addZero(new Date(data.date).getDate() + '. ' + months[new Date(data.date).getMonth()])}</p>
                                <p>{data.time.toString().replaceAll(',', '; ')}</p>
                            </div>
                        </div>
                        <p>
                            <FontAwesomeIcon
                                icon={faPhone}
                                size="sm"
                                className="align-middle"
                            />
                            <span> </span>
                            {data.clientPhone}
                        </p>

                        <p>
                            <FontAwesomeIcon icon={faAt} size="sm" className="align-middle" />
                            <span> </span>
                            {data.clientEmail}
                        </p>
                        <p>
                            <FontAwesomeIcon
                                icon={faPersonBooth}
                                size="sm"
                                className="align-middle"
                            />
                            <span> </span>
                            {data.barberName == 'Saša' ? "Saša Vučković" : "Danijel Maksimović"}
                        </p>
                        {data.confirmed && <p style={{ color: '#38b28b' }} >
                            <FontAwesomeIcon
                                icon={faCheck}
                                size="sm"
                                className="align-middle"
                            />
                            <span> </span>
                            Potvrđeno
                        </p>}
                        <p className="order-services"> Usluge:</p>
                        {data.services.length ? data.services.map((s) => {
                            return (
                                <div key={s._id} className="order-flex">
                                    <div className="order-icon">
                                        <FontAwesomeIcon
                                            icon={faScissors}
                                            size="sm"
                                            className="align-middle"
                                        />
                                    </div>
                                    <div className="order-main">
                                        <h2 className="order-title">{s.name}</h2>
                                        <p>{s.price}</p>
                                    </div>
                                </div>
                            );
                        }) : <p className="empty" >Usluge nisu unete pri
                            ručnom zakazivanju sa kontrolne table ili su u međuvremenu obrisane iz sekcije usluga.</p>}
                    </div>
                </div>
                <div className="details-buttons">
                    {!data.confirmed && (
                        <div
                            className="details-confirm"
                            onClick={() => handleConfirm(data._id as string)}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                size="sm"
                                className="align-middle"
                            />
                            <p>Potvrdi</p>
                        </div>
                    )}
                    <div
                        className="details-cancel"
                        onClick={() => handleRemove(data._id as string, data.confirmed)}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            size="sm"
                            className="align-middle"
                        />
                        <p>Obriši</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
