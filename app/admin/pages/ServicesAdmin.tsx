import { faPlus, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IServiceResponse } from "../types";
import { ServicesModal } from "../components/ServicesModal";

export const ServicesAdmin = ({ setLoading }: IServicesAdmin) => {
    const [modal, setModal] = useState<{
        open: boolean
        data: IServiceResponse | null
    }>({ open: false, data: null });
    const [services, setServices] = useState<IServiceResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resp = await axios.get("/api/services");
                setServices(resp.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Greška na serveru");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-services">
            <div className="admin-services__top">
                <h1>Usluge</h1>
                <div className="add-schedule" onClick={() => setModal({ open: true, data: null })} >
                    <FontAwesomeIcon icon={faPlus} size="sm" className="align-middle" />
                    <p>Dodaj uslugu</p>
                </div>
            </div>
            <div className="services-container">
                {services.length ? services.map((s) => (
                    <div key={s._id} className="single-service" onClick={() => setModal({ open: true, data: s })} >
                        <FontAwesomeIcon
                            icon={faScissors}
                            size="sm"
                            className="align-middle"
                        />
                        <div className="single-service__text">
                            <h3>{s.name}</h3>
                            <p>{s.price}</p>
                        </div>
                    </div>
                )) : <p className="empty" >Nema dodatih usluga.</p>}
            </div>
            {modal.open && (
                <ServicesModal
                    closeModal={() => setModal({ open: false, data: null })}
                    services={services}
                    setServices={setServices}
                    setLoading={setLoading}
                    initData={modal.data}
                />
            )}
        </div>
    );
};

interface IServicesAdmin {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
