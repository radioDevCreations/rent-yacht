import { useEffect, useState } from 'react';
import './ReservationDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import Reservation from '@/models/Reservation';
import Harbour from '@/models/Harbour';
import Image from 'next/image'
import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';

interface ReservationDetailsProps{
    reservationId: string;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({ reservationId }) => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [harbour, setHarbour] = useState<Harbour | null>(null);
  
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const responseReservation = await DataLoader.selectReservationById(Number(reservationId)); 
        const responseHarbour = await DataLoader.selectHarbour(responseReservation.harbourId); 
        setReservation(responseReservation);
        setHarbour(responseHarbour);
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
        <button className="reservation-details__return" onClick={() => BoatifyGoTo(`/reservations`)}>
            <FaRegArrowAltCircleLeft />
        </button>
        <div className="reservation-details__info">
            <div className="reservation-details__name">
                <h2 className="reservation-details__name-field-text">
                    {reservation?.name}
                </h2>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-descrition">{Captions.BOAT_DESCRIPTION}</span>
                <span className="reservation-details__field-descrition-text">Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&#39;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_MODEL}</span>
                <span className="reservation-details__field-text">{reservation?.model}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_TYPE}</span>
                <span className="reservation-details__field-text">{reservation?.type}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_PRICE_PER_DAY}</span>
                <span className="reservation-details__field-text">{reservation?.pricePerDay} {Captions.PLN}</span>
            </div>
            <div className="reservation-details__field">
                <span className="reservation-details__field-name">{Captions.BOAT_CURRENT_LOCATION}</span>
                <span className="reservation-details__field-text">{harbour?.name}</span>
            </div>
            <div className="reservation-details__buttons">
                <BoatifyButton
                    value="Rent this reservation"
                    type={ButtonType.button}
                    onClick={() => BoatifyGoTo(`/reservation/${reservationId}`)}
                    disabled={!!token}
                    classModifier='reservationify-button__reservation-details'
                />
                <BoatifyButton
                    value="Log In"
                    type={ButtonType.button}
                    onClick={() => BoatifyGoTo(`/login`)}
                    disabled={!token}
                    classModifier='reservationify-button__reservation-details'
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
