import './ReservationDetails.scss';

interface ReservationDetailsProps{
    reservationId: string;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({ reservationId }) => {
  return (
    <p>reservationId: {reservationId}</p>
  );
};

export default ReservationDetails;
