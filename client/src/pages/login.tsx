import './login.scss';
import SingleFormLayout from '../layouts/SingleFormLayout/SingleFormLayout';
import LoginForm from '../components/LoginForm/LoginForm';
import BoatifyLinkProps from '@/utilities/BoatifyLinkProps';

const LoginPage = ({ data }: any) => {
  const problem = "Nie masz jeszcze konta? ";
  const linkProps: BoatifyLinkProps = {
    href: '/register',
    linkText: 'Zarejestruj się',
  };
  return (
    <SingleFormLayout problem={problem} link={linkProps}>
      <section className="login-page">
        <LoginForm />
      </section>
    </SingleFormLayout>
  );
};

export default LoginPage;
