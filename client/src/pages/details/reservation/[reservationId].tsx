import './reservationId.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Details from '@/components/Details/Details';
import { SystemBoolean } from '@/utilities/System';
import ReservationDetails from '@/components/ReservationDetails/ReservationDetails';


export async function getServerSideProps(context: any) {
  const { reservationId } = context.params;

  if (!reservationId) {
    return {
      notFound: SystemBoolean.True,
    };
  }

  return {
    props: { reservationId },
  };
}


const ReservationDetailsPage = ({reservationId}: any) => {
  return (
    <MainLayout onlyForLogged>
      <Details>
        <ReservationDetails reservationId={reservationId}/>
      </Details>
    </MainLayout>
  );
};

export default ReservationDetailsPage;
