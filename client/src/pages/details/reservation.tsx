import './reservation.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Details from '@/components/Details/Details';

const ReservationDetailsPage = () => {
  return (
    <MainLayout onlyForLogged>
      <Details />
    </MainLayout>
  );
};

export default ReservationDetailsPage;
