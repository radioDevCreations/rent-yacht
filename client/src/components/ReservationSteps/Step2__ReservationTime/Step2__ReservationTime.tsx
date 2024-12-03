import { ChangeEvent, useState } from 'react';
import './Step2__ReservationTime.scss';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import InputType from '@/utilities/InputType';
import BoatifyDateOperations from '@/utilities/BoatifyDateOperations';
import { FaArrowRight } from 'react-icons/fa6';
import ButtonType from '@/utilities/ButtonType';
import { setReservationPage } from '@/redux/slices/reservationSlice';
import Reservation from '@/models/Reservation';
import DataLoader from '@/dataLoaders/DataLoader';
import { SystemBoolean } from '@/utilities/System';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import moment from 'moment';

const Step2__ReservationTime = () => {
	const dispatch = useDispatch();
    const [data, setData] = useState<Reservation[]>([]);
    const [isAvailable, setIsAvailable] = useState<boolean>(SystemBoolean.False);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment((new Date())).add(1, 'days').format('YYYY-MM-DD'));

    let reservationState = useSelector((state: any) => state.reservation);

    const handleClickCheckTime = async () => {
		try {
			setLoading(SystemBoolean.True);
			setError(null);
            const isAvailableSlot: boolean = await DataLoader.isBoatAvailable(
                1023,
                startDate,
                endDate
            );
        
            if (isAvailableSlot) {
                setIsAvailable(true);
                console.log(`The boat ${1023} is available from ${startDate} to ${endDate}.`);
            } else {
                console.log(`The boat ${1023} is not available during the specified period.`);
            }

            const reservedates: any = await DataLoader.getAllReservedDatesForBoat(1023);
        
            if (reservedates) {
                console.log(`Reserved dates for boat ${1023}: ${reservedates.join(', ')}`);
            } else {
                console.log(`The boat is free everyday`);
            }

			
			//setData(data);
			//nextReservationPage();
		  } catch (err: any) {
			setError(err.message || "Failed to create reservation");
			console.log(error)
		  } finally {
			setLoading(false);
		  }
	}

	const handleClickPreviousPage= () => {
		dispatch(setReservationPage(reservationState.new_ReservationPage - 1));
	};

    const handleNextReservationPage = () => {
		dispatch(setReservationPage(reservationState.new_ReservationPage + 1));
	};

    return ( <div className="reservation-time">
        <div className="reservation-time-indicator">
			<div className="reservation-time__from-tile">
				<span className="reservation-time__from-day">
					{BoatifyDateOperations.getDayFromISOString(startDate)}
				</span>
				<span className="reservation-time__from-month">
					{BoatifyDateOperations.getMonthAbbreviationFromISOString(startDate)}
				</span>
			</div>
			<div className="reservation-time__arrow"><FaArrowRight /></div>
			<div className="reservation-time__to-tile">
			<span className="reservation-time__to-day">
					{BoatifyDateOperations.getDayFromISOString(endDate)}
			</span>
			<span className="reservation-time__to-month">
				{BoatifyDateOperations.getMonthAbbreviationFromISOString(endDate)}
			</span>
			</div>
		</div>
        <div className="input-section">
            <BoatifyInput
                label="Start Date"
                key="start-date"
                placeholder="2"
                type={InputType.datetimeLocal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)}

                />
            <div className='margin'></div>
            <BoatifyInput
                label="End Date"
                key="end-date"
                placeholder="2"
                type={InputType.datetimeLocal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value)}
                />
        </div>
        <div className="button-section">
            <BoatifyButton
                        onClick={handleClickPreviousPage}
                        value="Previous"
                        type={ButtonType.button}
                        classModifier="boatify-button--reservation-time-prev"
                    />
            <BoatifyButton
                        onClick={handleClickCheckTime}
                        value="Check Time"
                        type={ButtonType.button}
                        classModifier="boatify-button--reservation-time-check"
                    />
            <BoatifyButton
                onClick={handleNextReservationPage}
                value="Show Reservation"
                type={ButtonType.button}
                classModifier="boatify-button--reservation-time boatify-button--orange"
                disabled={!isAvailable}
            />
        </div>
    </div>  );
}
 
export default Step2__ReservationTime;
