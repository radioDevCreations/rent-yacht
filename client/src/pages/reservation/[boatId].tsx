import './boatId.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Reservation from '@/components/Reservation/Reservation';
import { SystemBoolean } from '@/utilities/System';

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
  console.log(boatId);

  return (
    <MainLayout>
      <Reservation boatId={boatId != undefined ? +boatId : undefined} />
    </MainLayout>
  );
};

export default ReservationPage;
