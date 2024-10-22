import { formatDate, servicesList } from "@/app/data";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { faCheck, faClose, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, DatePickerProps } from "antd";
import { IAppointmentResponse, IServiceResponse } from "../types";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { IServicesCheckbox } from "@/app/services/page";

export const Modal = ({
    loading,
    availableTimes,
    closeModal,
    setLoading,
    fetchAvailableTimes,
    setAppointments,
    selectedDate
}: IModal) => {
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

    const [services, setServices] = useState<IServicesCheckbox[]>([]);

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

    const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
        fetchAvailableTimes(formatDate(dateString as string))
        setData(prev => {
            let copy = structuredClone(prev)
            copy.date = formatDate(dateString as string)
            return copy
        })
    };

    const handleCheckboxChange = (serviceId: string) => {
        setServices(prev => {
            const copy = structuredClone(prev)
            const index = copy.findIndex(s => s._id == serviceId)
            copy[index].checked = !copy[index].checked
            return copy
        })
    };

    const handleChange = (e: any, name: string) => {
        if (name == "barberName") {
            fetchAvailableTimes();
        }
        setData((prev: IAppointmentResponse) => {
            let copy: any = structuredClone(prev);
            copy[name] = e.target.value;
            return copy;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const obj = {
                ...data,
                services: services.map(s => s._id),
                time: data.time || availableTimes[0]
            };
            const resp = await axios.post("api/make_appointment?confirmed=true", {
                ...obj,
            });
            if (resp.status == 200) {
                toast.success("Termin je uspešno zakazan");
                setLoading(false);
                if (new Date(data.date).getDate() == selectedDate.getDate() && new Date(data.date).getFullYear() == selectedDate.getFullYear() && new Date(data.date).getMonth() == selectedDate.getMonth()) {
                    setAppointments((prev: any) => {
                        const copy = structuredClone(prev)
                        copy.push({
                            ...obj,
                            confirmed: true,
                            services,
                            _id: resp.data.message.id,
                        })
                        return copy
                    })
                }
                closeModal();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Doslo je do greške.");
        }
    };

    return <div className="modal">
        <div className="modal-content">
            <div className="modal-top">
                <h2>Zakazivanje</h2>
                <div className="modal-close-btn" onClick={closeModal} >
                    <FontAwesomeIcon
                        icon={faClose}
                        size="sm"
                        className="align-middle"
                    />
                </div>

            </div>
            <div className="modal-inputs">
                <Input
                    admin
                    label="Ime"
                    onChange={(e: any) => handleChange(e, "clientName")}
                    value={data.clientName}
                    type="text"
                    placeholder="Unesite ime"
                />
                <Input
                    admin
                    label="Telefon "
                    onChange={(e: any) => handleChange(e, "clientPhone")}
                    value={data.clientPhone}
                    type="tel"
                    placeholder="Unesite telefon"
                />
                <Input
                    admin
                    label="E-mail "
                    onChange={(e: any) => handleChange(e, "clientEmail")}
                    value={data.clientEmail}
                    type="mail"
                    placeholder="Unesite e-mail"
                />
                <Select
                    admin
                    label="Frizer"
                    onChange={(e: any) => handleChange(e, "barberName")}
                    options={["Saša", "Danijel"]}
                    value={data.barberName}
                />
                {!loading && (
                    <Select
                        admin
                        label="Termin"
                        onChange={(e: any) => handleChange(e, "time")}
                        options={availableTimes}
                        value={data.time[0]}
                    />
                )}
                <div className="modal-calendar">
                    <p>Datum</p>
                    <DatePicker format='YYYY/MM/DD' value={[dayjs(new Date(data.date))]} onChange={onChange} needConfirm />
                </div>
                <p>Usluge:</p>
                <div className="services-modal-container">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className="flex items-center mb-4 flew-wrap "
                        >
                            <input
                                type="checkbox"
                                id={service.name}
                                name={service.name}
                                // @ts-ignore
                                checked={service.checked}
                                onChange={() => handleCheckboxChange(service._id)}
                                className="mr-2"
                            />
                            <label
                                htmlFor={service.name}
                                style={{ color: "#101010", fontSize: 15 }}
                                className="checkbox-label"
                            >
                                {service.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="details-confirm" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheck} size="sm" />
                    <p style={{ width: "auto" }}>Potvrdi</p>
                </div>
            </div>
        </div>
    </div>
};

interface IModal {
    loading: boolean;
    availableTimes: any;
    closeModal: any;
    fetchAvailableTimes: any
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setAppointments: React.Dispatch<React.SetStateAction<IAppointmentResponse[]>>
    selectedDate: Date
}