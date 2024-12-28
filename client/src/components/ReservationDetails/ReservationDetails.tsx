import { useEffect, useState } from 'react';
import './ReservationDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo, BoatifyWindowReload } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import Reservation from '@/models/Reservation';
import Image from 'next/image'
import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import Boat from '@/models/Boat';
import Harbour from '@/models/Harbour';
import ReservationStatus from '@/utilities/ReservationStatus';

interface ReservationDetailsProps{
    reservationId: string;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({ reservationId }) => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [boat, setBoat] = useState<Boat | null>(null);
  const [harbour, setHarbour] = useState<Harbour | null>(null);
  
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const responseReservation = await DataLoader.selectReservationById(token, Number(reservationId)); 
        const responseBoat= await DataLoader.selectBoatById(Number(responseReservation.boatId)) 
        setReservation(responseReservation);
        setBoat(responseBoat);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservation data');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchUser();
  }, [reservationId]);

  if (loading) {
    return <div>Loading reservation...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="reservation-details">
        <button className="reservation-details__return" onClick={() => BoatifyGoTo(`/my-reservations`)}>
            <FaRegArrowAltCircleLeft />
        </button>
        <div className="reservation-details__info">
            <div className="reservation-details__name">
                <h2 className="reservation-details__name-field-text">
                    {Captions.RESERVATION}
                </h2>
            </div>
            {/* <div className="reservation-details__field">
                <span className="reservation-details__field-descrition">{Captions.BOAT_DESCRIPTION}</span>
                <span className="reservation-details__field-descrition-text">{boat?.description}</span>
            </div> */}
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_NAME}</span>
                <span className="reservation-details__field-text">{boat?.name}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_MODEL}</span>
                <span className="reservation-details__field-text">{boat?.model}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_TYPE}</span>
                <span className="reservation-details__field-text">{boat?.type}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.RESERVATION_TOTAL_PRICE}</span>
                <span className="reservation-details__field-text">{reservation?.totalPrice.toFixed(2)} {Captions.PLN}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.RESERVATION_STATUS}</span>
                <span className="reservation-details__field-text">{reservation?.reservationStatusName}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.RESERVATION_START_DATE}</span>
                <span className="reservation-details__field-text">{new Date(`${reservation?.startDate}`).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.RESERVATION_END_DATE}</span>
                <span className="reservation-details__field-text">{new Date(`${reservation?.endDate}`).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}</span>
            </div>
            <div className="reservation-details__buttons">
                <BoatifyButton
                    value="Pay"
                    type={ButtonType.button}
                    onClick={() => BoatifyGoTo(`/reservation/${reservationId}`)}
                    disabled={!token}
                    classModifier='boatify-button__reservation-details'
                />
                <BoatifyButton
                    value="Cancel"
                    type={ButtonType.button}
                    onClick={async () =>  {
                      await DataLoader.updeteReservationStatus(sessionStorage.getItem('token'), {reservationId: reservation?.id, reservationStatus: ReservationStatus.Cancelled});
                      BoatifyWindowReload();
                    }}
                    disabled={!token}
                    classModifier='boatify-button__reservation-details'
                />
            </div>
        </div>
        <div className="reservation-details__image">
            <Image
                src="/profile.png"
                width={352}
                height={352}
                alt="Picture of the reservation"
            />
        </div>
    </div>
  );
};

export default ReservationDetails;
