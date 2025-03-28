import './boatId.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Details from '@/components/Details/Details';
import { SystemBoolean } from '@/utilities/System';
import BoatDetails from '@/components/BoatDetails/BoatDetails';

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

const BoatDetailsPage = ({boatId}: any) => {
  return (
    <MainLayout>
      <Details>
        <BoatDetails boatId={boatId}/>
      </Details>
    </MainLayout>
  );
};

export default BoatDetailsPage;
