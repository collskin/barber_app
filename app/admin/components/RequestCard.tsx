import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IAppointmentResponse } from "../types"
import { addZero, months } from "@/app/data"

export const RequestCard = ({ setDetails, data, setOpenDetails }: IRequestCard) => {

    return <div className="schedule-card" onClick={() => {
        setOpenDetails(true)
        setDetails(data)
    }} >
        <h2>{data.clientName}</h2>
        <div className="schedule-card__bottom" >
            <p>
                <FontAwesomeIcon
                    icon={faCalendar}
                    size="sm"
                    className="align-middle"
                />
                <span>  </span>
                {addZero(new Date(data.date).getDate()) + '. ' + months[new Date(data.date).getMonth()]}
            </p>

            <p>
                <FontAwesomeIcon
                    icon={faClock}
                    size="sm"
                    className="align-middle"
                />
                <span>  </span>
                {data.time[0]}
            </p>
        </div>
    </div>
}

interface IRequestCard {
    setDetails: any
    data: IAppointmentResponse
    setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}