import { ChangeEvent, useState } from 'react';
import './Step2__ReservationTime.scss';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import InputType from '@/utilities/InputType';
import BoatifyDateOperations from '@/utilities/BoatifyDateOperations';
import { FaArrowRight } from 'react-icons/fa6';
import ButtonType from '@/utilities/ButtonType';
import {
  setBoatId,
  setEndDate,
  setReservationPage,
  setStartDate,
  setTotalPrice,
} from '@/redux/slices/reservationSlice';
import DataLoader from '@/dataLoaders/DataLoader';
import { SystemBoolean } from '@/utilities/System';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import moment from 'moment';
import Captions from '@/captions/captions';
import { RootState } from '@/redux/store';

const Step2__ReservationTime = (data: any) => {
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState<boolean>(SystemBoolean.False);
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setTemporaryStartDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [endDate, setTemporaryEndDate] = useState(
    moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  );

  let reservationState = useSelector((state: RootState) => state.reservation);

  const handleClickCheckTime = async () => {
    try {
      setLoading(SystemBoolean.True);
      setError(null);
      const isAvailableSlot: boolean = await DataLoader.isBoatAvailable(
        data.boat.id,
        startDate,
        endDate
      );

      if (isAvailableSlot) {
        setIsAvailable(SystemBoolean.True);
      }

      const reservedates: any = await DataLoader.getAllReservedDatesForBoat(
        data.boat.id
      );

      if (reservedates) {
        console.log(
          `Reserved dates for boat ${data.boat.id}: ${reservedates.join(', ')}`
        );
      } else {
        console.log(`The boat is free everyday`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create reservation');
      console.log(error);
    } finally {
      setLoading(SystemBoolean.False);
    }
  };

  const handleClickPreviousPage = () => {
    dispatch(setReservationPage(reservationState.new_ReservationPage - 1));
  };

  const handleNextReservationPage = () => {
    dispatch(setBoatId(data.boat.id));
    dispatch(
      setTotalPrice(
        +data.boat.pricePerDay *
          moment(endDate, 'YYYY-MM-DD').diff(startDate, 'days')
      )
    );
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
    dispatch(setReservationPage(reservationState.new_ReservationPage + 1));
  };

  return (
    <div className="reservation-time">
      <div className="time-and-price">
        <div className="reservation-time-indicator--time">
          <div className="reservation-time__from-tile">
            <span className="reservation-time__from-day">
              {BoatifyDateOperations.getDayFromISOString(startDate)}
            </span>
            <span className="reservation-time__from-month">
              {BoatifyDateOperations.getMonthAbbreviationFromISOString(
                startDate
              )}
            </span>
          </div>
          <div className="reservation-time__arrow">
            <FaArrowRight />
          </div>
          <div className="reservation-time__to-tile">
            <span className="reservation-time__to-day">
              {BoatifyDateOperations.getDayFromISOString(endDate)}
            </span>
            <span className="reservation-time__to-month">
              {BoatifyDateOperations.getMonthAbbreviationFromISOString(endDate)}
            </span>
          </div>
        </div>
        <div className="reservation-price">
          <span className="total-price__price-per-day">
            {data.boat.pricePerDay} {Captions.PLN}
          </span>
          <span className="total-price__X"> {Captions.X} </span>
          <span className="total-price__days-count">
            {moment(endDate, 'YYYY-MM-DD').diff(startDate, 'days')} days
          </span>
          <span className="total-price__equals-sign">
            {' '}
            {Captions.EqualsSign}{' '}
          </span>
          <span className="total-price__total">
            {+data.boat.pricePerDay *
              moment(endDate, 'YYYY-MM-DD').diff(startDate, 'days')}{' '}
            {Captions.PLN}
          </span>
        </div>
      </div>
      <div className="input-section">
        <BoatifyInput
          label="Start Date"
          key="start-date"
          placeholder="2"
          type={InputType.datetimeLocal}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTemporaryStartDate(event.target.value)
          }
        />
        <div className="margin"></div>
        <BoatifyInput
          label="End Date"
          key="end-date"
          placeholder="2"
          type={InputType.datetimeLocal}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTemporaryEndDate(event.target.value)
          }
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
          value="Select Time"
          type={ButtonType.button}
          classModifier="boatify-button--reservation-time boatify-button--orange"
          disabled={!isAvailable}
        />
      </div>
    </div>
  );
};

export default Step2__ReservationTime;
