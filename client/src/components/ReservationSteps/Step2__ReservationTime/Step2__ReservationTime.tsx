import { useEffect, useState } from 'react';
import './Step2__ReservationTime.scss';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
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
import BoatifyDatePicker from '@/boatify-components/BoatifyDatePicker/BoatifyDatePicker';

const Step2__ReservationTime = (data: any) => {
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(SystemBoolean.False);
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [reserveddates, setReservedDates] = useState<Date[] | null>(null);

  const [startDate, setTemporaryStartDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [endDate, setTemporaryEndDate] = useState(
    moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  );

  let reservationState = useSelector((state: RootState) => state.reservation);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const datesResponse: any = await DataLoader.getAllReservedDatesForBoat(
          data.boat.id
        );
        const datesFormatted: Date[] = datesResponse.map((date: any) => new Date(date));
        setReservedDates(datesFormatted);
        setLoading(SystemBoolean.False);
      } catch (err: any) {
        setError(err.message || 'Failed to load reserved dates');
        setLoading(SystemBoolean.False);
      }
    };

    fetchReservedDates();
  }, [data.boat.id]);

  const checkAvailability = async (start: string, end: string) => {
    try {
      setLoading(SystemBoolean.True);
      setError(null);
      const isAvailableSlot: boolean | undefined = await DataLoader.isBoatAvailable(
        data.boat.id,
        start,
        end
      );

      setIsAvailable(isAvailableSlot);
    } catch (err: any) {
      setError(err.message || 'Failed to check availability');
    } finally {
      setLoading(SystemBoolean.False);
    }
  };

  const checkAvailabilityOnClick = (start: string, end: string) => {
    if (!reserveddates) return true;

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (endDateObj <= startDateObj) {
      setIsAvailable(SystemBoolean.False);
    } else {
      setIsAvailable(!reserveddates.some(
        (reservedDate) =>
          reservedDate >= startDateObj && reservedDate <= endDateObj
      ));
    }
  };


  const handleClickPreviousPage = () => {
    dispatch(setReservationPage(reservationState.new_ReservationPage - 1));
  };

  const handleNextReservationPage = async () => {
    await checkAvailability(startDate, endDate)
    if(isAvailable){
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
  }};

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
        <BoatifyDatePicker
          busyDates={reserveddates}
          selectedDate={new Date(startDate)}
          onDateChange={async (date: Date | null) => {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            setTemporaryStartDate(formattedDate);
            setIsAvailable(SystemBoolean.False);
            await checkAvailabilityOnClick(formattedDate, endDate);
          }}
        />
        <div className="margin"></div>
        <BoatifyDatePicker
          busyDates={reserveddates}
          selectedDate={new Date(endDate)}
          onDateChange={async (date: Date | null) => {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            setTemporaryEndDate(formattedDate);
            setIsAvailable(SystemBoolean.False);
            await checkAvailabilityOnClick(startDate, formattedDate);
          }}
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
