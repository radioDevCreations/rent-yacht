import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        dayClassName={(date) => (isDateBusy(date) ? "busy-day" : '')}
        filterDate={(date) => !isDateBusy(date)} // Optional: Prevent selecting busy dates
        renderDayContents={(day, date) =>
          isDateBusy(date) ? (
            <div title="Busy date" className="busy-indicator">
              {day}
            </div>
          ) : (
            <div>{day}</div>
          )
        }
      />
      <style>{`
        .busy-day {
          background-color: #f8d7da;
          color: #721c24;
        }
        .busy-indicator {
          position: relative;
        }
        .busy-indicator:after {
          content: '*';
          color: red;
          font-size: 10px;
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
};

export default BoatifyDatePicker;
