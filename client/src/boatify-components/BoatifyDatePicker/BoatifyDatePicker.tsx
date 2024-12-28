import React from "react";
import './BoatifyDatePicker.scss';
import DatePicker from "react-datepicker";
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import ButtonType from "@/utilities/ButtonType";

interface BoatifyDatePickerProps {
  busyDates: Date[] | null;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const BoatifyDatePicker: React.FC<BoatifyDatePickerProps> = ({
  busyDates,
  selectedDate,
  onDateChange,
}) => {
  const isDateBusy = (date: Date): boolean | undefined => {
    return busyDates?.some(
      (busyDate) => date.toDateString() === busyDate.toDateString()
    );
  };

  return (
    <div className="date-pickers-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        inline
        dayClassName={(date) => (isDateBusy(date) ? "busy-day" : "")}
        filterDate={(date) => !isDateBusy(date)}
        renderDayContents={(day, date) =>
          isDateBusy(date) ? (
            <div title="Busy date" className="busy-indicator">
              {day}
            </div>
          ) : (
            <div>{day}</div>
          )
        }
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          changeYear,
        }) => (
          <div className="custom-header">
            <button type={ButtonType.button} onClick={() => changeYear(date.getFullYear() - 1)}>
              <FaAngleDoubleLeft />
            </button>
            <button type={ButtonType.button} onClick={decreaseMonth}>
              <FaAngleLeft />
            </button>
            <span>
              {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
            </span>
            <button type={ButtonType.button} onClick={increaseMonth}>
              <FaAngleRight />
            </button>
            <button type={ButtonType.button} onClick={() => changeYear(date.getFullYear() + 1)}>
              <FaAngleDoubleRight />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default BoatifyDatePicker;
