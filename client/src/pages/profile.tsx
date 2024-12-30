import './profile.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Details from '@/components/Details/Details';
import UserDetails from '@/components/UserDetails/UserDetails';

const ProfilePage = () => {
  return (
    <MainLayout onlyForLogged>
      <Details>
        <UserDetails />
      </Details>
    </MainLayout>
  );
};

export default ProfilePage;
