import './boatId.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import SelfReservation from '@/components/SelfReservation/SelfReservation';
import { SystemBoolean } from '@/utilities/System';
import Details from '@/components/Details/Details';

export async function getServerSideProps(context: any) {
  const { boatId } = context.params;

  if (!boatId) {
    return {
      notFound: SystemBoolean.True,
    };
  }

  return {
    props: { boatId },
  };
}

const ReservationPage = ({ boatId }: any) => {
  return (
    <MainLayout onlyForLogged>
      <Details>
        <SelfReservation boatId={boatId != undefined ? +boatId : undefined} />
      </Details>
    </MainLayout>
  );
};

export default ReservationPage;
