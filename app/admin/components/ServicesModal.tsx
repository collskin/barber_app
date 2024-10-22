import { Input } from "@/components/Input";
import { faCheck, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IServiceResponse } from "../types";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ServicesModal = ({
    closeModal,
    setLoading,
    setServices,
    initData
}: IServicesModal) => {
    const [data, setData] = useState<IServiceResponse>(initData ?? {
        name: '',
        price: null,
        slots: 1,
        _id: ''
    });

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete("api/services?id=" + data._id);
            setServices(prev => {
                let copy = structuredClone(prev)
                copy = copy.filter(s => s._id !== data._id)
                return copy
            })
            toast.success("Usluga je uspešno obrisana.");
            setLoading(false);
            closeModal();
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Doslo je do greške.");
        }
    }

    const handleChange = (e: any, name: string) => {
        setData((prev: IServiceResponse) => {
            let copy: any = structuredClone(prev);
            copy[name] = e.target.value;
            return copy;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!data._id) {
                const resp = await axios.post("api/services", { name: data.name, price: data.price, slots: data.slots });
                setServices(prev => [...prev, resp.data])
                toast.success("Usluga je uspešno sačuvana.");
            } else {
                const resp = await axios.patch("api/services", data);
                setServices(prev => {
                    const copy = structuredClone(prev)
                    const index = copy.findIndex(s => s._id == data._id)
                    copy[index] = resp.data
                    return copy
                })
                toast.success("Usluga je uspešno izmenjena.");
            }
            setLoading(false);
            closeModal();
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Doslo je do greške.");
        }
    };

    return <div className="modal">
        <div className="modal-content">
            <div className="modal-top">
                <h2>{data._id ? 'Izmena' : 'Dodavanje'} usluge</h2>
                <FontAwesomeIcon
                    icon={faX}
                    size="sm"
                    className="align-middle"
                    onClick={closeModal}
                />
            </div>
            <div className="modal-inputs">
                <Input
                    admin
                    label="Ime"
                    onChange={(e: any) => handleChange(e, "name")}
                    value={data.name}
                    type="text"
                    placeholder="Unesite ime"
                />
                <Input
                    admin
                    label="Cena "
                    onChange={(e: any) => handleChange(e, "price")}
                    value={data.price as number}
                    type="number"
                    placeholder="Unesite cenu"
                />
                <Input
                    admin
                    label="Termini"
                    onChange={(e: any) => handleChange(e, "slots")}
                    value={data.slots as number}
                    type="number"
                    placeholder="Unesite broj termina"
                />
                <div className="details-buttons modal-buttons">
                    <div className="details-confirm" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faCheck} size="sm" />
                        <p style={{ width: "auto" }}>Potvrdi</p>
                    </div>
                    {data._id && <div className="details-cancel" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                        <p style={{ width: "auto" }}>Obriši</p>
                    </div>}
                </div>
            </div>
        </div>
    </div>
};

interface IServicesModal {
    closeModal: any;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    services: IServiceResponse[]
    setServices: React.Dispatch<React.SetStateAction<IServiceResponse[]>>
    initData: IServiceResponse | null
}
