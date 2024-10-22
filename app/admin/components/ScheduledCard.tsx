import { faAt, faPersonBooth, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IAppointmentResponse } from "../types"

export const ScheduledCard = ({ setDetails, data, setOpenDetails }: IScheduledCard) => {
    return <div className="confirmed-card" onClick={() => {
        setOpenDetails(true)
        setDetails(data)
    }} >
        <h1>{data.clientName}</h1>
        <p>
            <FontAwesomeIcon
                icon={faAt}
                size="sm"
                className="align-middle"
            />
            <span>  </span>
            {data.clientEmail}
        </p>
        <p>
            <FontAwesomeIcon
                icon={faPhone}
                size="sm"
                className="align-middle"
            />
            <span>  </span>
            {data.clientPhone}
        </p>
        <p>
            <FontAwesomeIcon
                icon={faPersonBooth}
                size="sm"
                className="align-middle"
            />
            <span>  </span>
            {data.barberName == 'Saša' ? "Saša Vučković" : "Danijel Maksimović"}
        </p>
        <div className="confirmed-time-container" >
            {data.time.map(t => <p key={t} className="confirmed-time" >{t}</p>)}
        </div>
    </div>
}

interface IScheduledCard {
    setDetails: any
    data: IAppointmentResponse
    setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>

}