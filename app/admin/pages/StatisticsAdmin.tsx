import { faMoneyBill, faPeopleGroup, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export const StatisticsAdmin = ({ setLoading }: IStatisticsAdmin) => {
    const [statistics, setStatistics] = useState({ done: 0, services: 0, revenue: 0 })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resp = await axios.get("/api/statistics");
                setStatistics(resp.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Greška na serveru");
            }
        };
        fetchData();
    }, []);
    return <div className="admin-statistics" >
        <h1>Statistika</h1>
        <div className="statistics-cards">
            <div className="statistics-card" >
                <div className="sc-left" >
                    <h1>Usluženo mušterija</h1>
                    <h3>{statistics.done || 0}</h3>
                </div>
                <FontAwesomeIcon
                    icon={faPeopleGroup}
                    size="sm"
                    className="align-middle"
                />
            </div>

            <div className="statistics-card" >
                <div className="sc-left" >
                    <h1>Usluga odrađeno</h1>
                    <h3>{statistics.services || 0}</h3>
                </div>
                <FontAwesomeIcon
                    icon={faScissors}
                    size="sm"
                    className="align-middle"
                />
            </div>

            <div className="statistics-card" >
                <div className="sc-left" >
                    <h1>Zarađeno</h1>
                    <h3>{statistics.revenue || 0}</h3>
                </div>
                <FontAwesomeIcon
                    icon={faMoneyBill}
                    size="sm"
                    className="align-middle"
                />
            </div>
        </div>
    </div>
}

interface IStatisticsAdmin {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}