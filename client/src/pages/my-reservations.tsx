import './my-reservations.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import MyReservations from '@/components/MyReservations/MyReservations';


const MyOrdersPage = () => {
  return (
    <MainLayout onlyForLogged>
      <MyReservations />
    </MainLayout>
  );
};

export default MyOrdersPage;
