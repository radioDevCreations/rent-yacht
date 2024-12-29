'use client';
import './SelfReservation.scss';
import { FC, useEffect, useState } from 'react';
import DataLoader from '@/dataLoaders/DataLoader';
import { SystemBoolean } from '@/utilities/System';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import BoatifyDatePicker from '@/boatify-components/BoatifyDatePicker/BoatifyDatePicker';
import { FaArrowRight } from 'react-icons/fa';
import BoatifyDateOperations from '@/utilities/BoatifyDateOperations';
import ButtonType from '@/utilities/ButtonType';
import moment from 'moment';
import Captions from '@/captions/captions';
import SuccessReconnect from '../Reconnect/SuccessReconnect/SuccessReconnect';

interface SelfReservationProps {
  boatId: number | undefined;
}

const SelfReservationForm: FC<SelfReservationProps> = ({ boatId }) => {
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(SystemBoolean.False);
  const [isSuccess, setIsSuccess] = useState<boolean>(SystemBoolean.False);
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [reserveddates, setReservedDates] = useState<Date[] | null>(null);

  const token = sessionStorage.getItem('token');

  const [startDate, setTemporaryStartDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [endDate, setTemporaryEndDate] = useState(
    moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  );

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        setLoading(SystemBoolean.True);
        const datesResponse: any = await DataLoader.getAllReservedDatesForBoat(
          boatId
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
  }, [boatId]);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      setLoading(SystemBoolean.True);
      setError(null);
  
      await DataLoader.createSelfReservation(token, {
        boatId: boatId,
        startDate: startDate,
        endDate: endDate,
      });
      setLoading(SystemBoolean.False);
      setIsSuccess(SystemBoolean.True);
    } catch (err: any) {
      setError(err.message || 'Failed to create reservation');
      console.error(err);
    } finally {
      setLoading(SystemBoolean.False);
    }
  };

  if (loading) {
    return <div>Loading boat...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
    {!isSuccess &&<form className="reservation" onSubmit={handleSubmit}>
      <div className="time-and-price">
        <h2 className="self-reservation">{Captions.SELF_RESERVATION}</h2>
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
          value="Select Time"
          type={ButtonType.submit}
          classModifier="boatify-button--reservation-time boatify-button--orange"
          disabled={!isAvailable}
        />
      </div>
    </form>}
    {isSuccess && <SuccessReconnect message="Successfully added self-reservation" url={`details/boat/${boatId}`} />}
    </>
  );
};

export default SelfReservationForm;
