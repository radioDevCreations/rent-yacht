import './register.scss';
import SingleFormLayout from '../layouts/SingleFormLayout/SingleFormLayout';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import BoatifyLinkProps from '@/utilities/BoatifyLinkProps';

const RegisterPage = ({ data }: any) => {
  const problem = 'Masz już konto? ';
  const linkProps: BoatifyLinkProps = { href: '/login', linkText: 'Zaloguj się' };
  return (
    <SingleFormLayout problem={problem} link={linkProps}>
      <section className="register-page">
        <RegisterForm />
      </section>
    </SingleFormLayout>
  );
};

export default RegisterPage;
