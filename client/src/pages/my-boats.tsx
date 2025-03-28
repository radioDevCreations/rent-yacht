import './my-boats.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import MyBoats from '@/components/MyBoats/MyBoats';

const MyOrdersPage = () => {
  return (
    <MainLayout onlyForLogged>
      <MyBoats />
    </MainLayout>
  );
};

export default MyOrdersPage;
