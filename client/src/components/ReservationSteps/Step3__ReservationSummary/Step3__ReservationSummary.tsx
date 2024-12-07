import ButtonType from '@/utilities/ButtonType';
import './Step3__ReservationSummary.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import { useEffect, useState } from 'react';
import SortDirection from '@/utilities/SortDirection';
import DataLoader from '@/dataLoaders/DataLoader';
import { useDispatch, useSelector } from 'react-redux';
import Captions from '@/captions/captions';
import { SystemBoolean } from '@/utilities/System';
import {
  setStartDate,
  setEndDate,
  setReservationPage,
} from '@/redux/slices/reservationSlice';
import BoatifyDateOperations from '@/utilities/BoatifyDateOperations';
import { FaArrowRight } from 'react-icons/fa';
import Reservation from '@/models/Reservation';

const Step3__ReservationSummary = (boat: any) => {
  const [data, setData] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  let reservationState = useSelector((state: any) => state.reservation);

  const handleClickMakeReservation = async () => {
    try {
      setLoading(SystemBoolean.True);
      setError(null);

      console.log(`{
          boatId: ${reservationState.new_ReservationData.boatId},
          userId: ${reservationState.new_ReservationData.loggedUserId},
          startDate: ${reservationState.new_ReservationData.startDate},
          endDate: ${reservationState.new_ReservationData.endDate},
          totalPrice: ${reservationState.new_ReservationData.totalPrice},
          reservationStatusId: ${reservationState.new_ReservationData.reservationStatusId},
        }`)

      // const response = await DataLoader.createReservation({
      //   boatId: reservationState.new_ReservationData.boatId,
      //   userId: reservationState.new_ReservationData.loggedUserId,
      //   startDate: reservationState.new_ReservationData.startDate,
      //   endDate: reservationState.new_ReservationData.endDate,
      //   totalPrice: reservationState.new_ReservationData.totalPrice,
      //   reservationStatusId:
      //     reservationState.new_ReservationData.reservationStatusId,
      // });
      setData(data);
      nextReservationPage();
    } catch (err: any) {
      setError(err.message || 'Failed to create reservation');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickPreviousPage = () => {
    dispatch(setReservationPage(reservationState.new_ReservationPage - 1));
  };

  const nextReservationPage = () => {
    dispatch(setReservationPage(reservationState.new_ReservationPage + 1));
  };

  return (
    <div className="reservation-summary">
      <div className="reservation-summary__boat-data boat-data">
        <h2 className="boat-data__item boat-data__model">Boat Model</h2>
        <h3 className="boat-data__item boat-data__name">Boat Name</h3>
        <p className="boat-data__item boat-data__type">
          {Captions.Type}Boat Type
        </p>
        <p className="boat-data__item boat-data__description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="reservation-summary__reservation-time reservation-time-indicator">
        <div className="reservation-time__from-tile">
          <span className="reservation-time__from-day">
            {BoatifyDateOperations.getDayFromISOString(
              reservationState.new_ReservationData.startDate
            )}
          </span>
          <span className="reservation-time__from-month">
            {BoatifyDateOperations.getMonthAbbreviationFromISOString(
              reservationState.new_ReservationData.startDate
            )}
          </span>
        </div>
        <div className="reservation-time__arrow">
          <FaArrowRight />
        </div>
        <div className="reservation-time__to-tile">
          <span className="reservation-time__to-day">
            {BoatifyDateOperations.getDayFromISOString(
              reservationState.new_ReservationData.endDate
            )}
          </span>
          <span className="reservation-time__to-month">
            {BoatifyDateOperations.getMonthAbbreviationFromISOString(
              reservationState.new_ReservationData.endDate
            )}
          </span>
        </div>
      </div>
      <div className="reservation-summary__total-price total-price">
        <span className="total-price__price-per-day">600.00 PLN</span>
        <span className="total-price__X"> {Captions.X} </span>
        <span className="total-price__days-count">7 days</span>
        <span className="total-price__equals-sign">
          {' '}
          {Captions.EqualsSign}{' '}
        </span>
        <span className="total-price__total">{reservationState.new_ReservationData.totalPrice} {Captions.PLN}</span>
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
    </div>
  );
};

export default Step3__ReservationSummary;
