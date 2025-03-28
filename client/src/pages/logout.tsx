import './login.scss';
import SingleFormLayout from '../layouts/SingleFormLayout/SingleFormLayout';
import LogoutReconnect from '@/components/Reconnect/LogoutReconnect/LogoutReconnect';

const LoginPage = () => {
  return (
    <SingleFormLayout noLogo>
      <section className="logout-page">
        <LogoutReconnect />
      </section>
    </SingleFormLayout>
  );
};

export default LoginPage;
