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

const Step2__ReservationTime = () => {
    const [data, setData] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());

    let reservationState = useSelector((state: any) => state.reservation);

    const handleClickMakeReservation = async () => {
		try {
			setLoading(SystemBoolean.True);
			setError(null);


			const response = await DataLoader.createReservation({
				boatId: reservationState.new_ReservationData.boatId, 
				userId: reservationState.new_ReservationData.loggedUserId, 
				startDate: reservationState.new_ReservationData.startDate, 
				endDate: reservationState.new_ReservationData.endDate, 
				totalPrice: reservationState.new_ReservationData.totalPrice, 
				reservationStatusId: reservationState.new_ReservationData.reservationStatusId});
			console.log(response)
			setData(data);
			nextReservationPage();
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

    const nextReservationPage = () => {
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
                label="Start Date"
                key="start-date"
                placeholder="2"
                type={InputType.datetimeLocal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value)}
                />
        </div>
        <BoatifyButton
					onClick={handleClickPreviousPage}
					value="Previous"
					type={ButtonType.button}
					classModifier="boatify-button--reservation-previous"
				/>
        <BoatifyButton
					onClick={handleClickMakeReservation}
					value="Make Reservation"
					type={ButtonType.button}
					classModifier="boatify-button--reservation"
				/>
    </div>  );
}
 
export default Step2__ReservationTime;

function dispatch(arg0: { payload: number; type: "reservation/setReservationPage"; }) {
    throw new Error('Function not implemented.');
}
