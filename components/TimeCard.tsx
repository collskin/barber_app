import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface TimeCardProps {
  time: string;
  onClick: any
  active: boolean
  taken: boolean
}

const TimeCard: React.FC<TimeCardProps> = ({ time, onClick, active, taken }) => {
  return (
    <div
      onClick={onClick}
      style={active ? { background: 'yellow' } : taken ? { opacity: .4, cursor: 'not-allowed' } : {}}
      className="w-16 h-6 flex justify-center items-center cursor-pointer bg-white
     hover:bg-yellow-300 transition-colors duration-300 m-1 rounded-md"
    >
      <p
        className="text-sm  flex items-center justify-center w-full h-full"
        style={{ color: "black", margin: 0, padding: 0 }}
      >
        <FontAwesomeIcon icon={faClock} size="xs" />
        &nbsp;{time}
      </p>
    </div>
  );
};

export default TimeCard;
