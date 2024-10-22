import {
    formatDate,
    generateTimeSlots,
    getTakenTimes,
    months,
    sortAppointmentsByFirstTime,
} from "@/app/data";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, DatePickerProps } from "antd";
import axios from "axios";
import { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RequestCard } from "../components/RequestCard";
import { ScheduledCard } from "../components/ScheduledCard";
import { IAppointmentResponse } from "../types";
import { Modal } from "../components/Modal";
import dayjs from 'dayjs'

export const MainAdmin = ({
    data,
    setData,
    appointments,
    setAppointments,
    unconfirmed,
    setUnconfirmed,
    date,
    setDate,
    loading,
    setLoading,
    setOpenDetails
}: IMainAdmin) => {
    const [modal, setModal] = useState(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const audioRef = useRef(null);

    const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
        setDate(new Date(dateString as string));
    };

    const closeModal = () => {
        setModal(false);
        setData({
            clientName: "",
            clientPhone: "",
            clientEmail: "",
            barberName: "Saša",
            time: [],
            services: [],
            confirmed: false,
            date: formatDate(new Date()),
        });
    };


    const times = generateTimeSlots();

    const fetchAvailableTimes = async (dt?: Date) => {
        try {
            setLoading(true);
            const resp = await axios.get(
                "/api/get-all?date=" +
                (dt ?? formatDate(date)) +
                "&barberName=" +
                (data.barberName == "Saša" ? "Saša" : "Danijel")
            );
            const avTim = times.filter(
                (t: any) => !resp.data.some((d: any) => d.time == t)
            );
            setAvailableTimes(
                avTim.filter(
                    (av: any) => !getTakenTimes(resp.data).some((tt: any) => tt == av)
                )
            );
            setData((prev: IAppointmentResponse) => ({ ...prev, time: [avTim[0]] }));
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Greška na serveru");
            setLoading(false);
        }
    };

    const fetchUnconfirmed = async (noLoading?: boolean) => {
        try {
            !noLoading && setLoading(true);
            const resp = await axios.get("/api/get-unconfirmed");
            // if (noLoading && (resp.data.length > unconfirmed.length)) {
            //     toast.info('Stigao je novi zahtev.')
            //     if (audioRef.current) {
            //         (audioRef.current as any).play();
            //     }
            // }
            setUnconfirmed(resp.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Greška na serveru");
        }
    };

    useEffect(() => {
        fetchUnconfirmed();
    }, []);

    useEffect(() => {


        const fetchData = async (noLoading?: boolean, length?: number) => {
            try {
                !noLoading && setLoading(true);
                const resp = await axios.get(
                    "/api/get-all?date=" + formatDate(date)
                );
                // //@ts-ignore
                // if (noLoading && (resp.data.length > length)) {
                //     toast.success('Stigao je novi zahtev.')
                //     if (audioRef.current) {
                //         (audioRef.current as any).play();
                //     }
                // }
                setAppointments(resp.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Greška na serveru");
            }
        };
        fetchData();
    }, [date]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUnconfirmed(true)
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleOpenModal = () => {
        setModal(true)
        fetchAvailableTimes()
    }

    return (
        <div className="admin-main">
            {/* <audio
                ref={audioRef}
                // src={bell}
                autoPlay={false}
                preload="auto"
            ></audio> */}

            <h1>Pregled termina</h1>
            <div className="schedule-list">
                <div className="title-bar">
                    <h3>Zahtevi:</h3>
                    <div className="add-schedule" onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPlus} size="sm" className="align-middle" />
                        <p>Zakaži termin</p>
                    </div>
                </div>
                <div className="schedule-scroll">
                    {unconfirmed.length ? unconfirmed.map((u) => (
                        <RequestCard key={u._id} setDetails={setData} data={u} setOpenDetails={setOpenDetails} />
                    )) : <p className="empty" >Nema novih zahteva.</p>}
                </div>
            </div>
            <div className="confirmed-list">
                <div className="title-bar">
                    <h3>
                        Zakazani termini za
                        {' ' + date.getDate() + ". " + months[date.getMonth()]}
                    </h3>
                    <DatePicker onChange={onChange} needConfirm />
                </div>

                <div className="confirmed-items">
                    {appointments.length ? sortAppointmentsByFirstTime(appointments).map((a) => (
                        <ScheduledCard key={a._id} setDetails={setData} data={a} setOpenDetails={setOpenDetails} />
                    )) : <p className="empty" >Nema zakazanih termina za ovaj datum.</p>}
                </div>
            </div>
            {modal && <Modal
                selectedDate={date}
                closeModal={closeModal}
                loading={loading}
                availableTimes={availableTimes}
                fetchAvailableTimes={fetchAvailableTimes}
                setLoading={setLoading}
                setAppointments={setAppointments}
            />}
        </div>
    );
};

interface IMainAdmin {
    data: IAppointmentResponse
    setData: React.Dispatch<React.SetStateAction<IAppointmentResponse>>
    appointments: IAppointmentResponse[]
    setAppointments: React.Dispatch<React.SetStateAction<IAppointmentResponse[]>>
    unconfirmed: IAppointmentResponse[]
    setUnconfirmed: React.Dispatch<React.SetStateAction<IAppointmentResponse[]>>
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}
