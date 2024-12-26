'use client';
import './LoginForm.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import { useDispatch, useSelector } from 'react-redux';
import IMAGE from '../../../public/links';
import DataLoader from '@/dataLoaders/DataLoader';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import { setLoggedUserId } from '@/redux/slices/applicationSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const responseToken = await DataLoader.loginUser({
        email: email,
        password: password,
      });

      const responseUserData = await DataLoader.getCurrentUserData(responseToken);

      
      sessionStorage.setItem('token', responseToken);
      sessionStorage.setItem('userId', responseUserData.id);

      BoatifyGoTo('/');
    } catch (error) {
      console.error(error);
    }

  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target?.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target?.value);
  };

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('token');
    if (jwtToken?.length) BoatifyGoTo('/');
  }, []);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <figure className="profile">
        <Image
          className="profile__picture"
          src={IMAGE.jpg.profile}
          alt="Profile Picture"
          width={80}
          height={80}
        />
        <figcaption className="profile__label"></figcaption>
      </figure>
      <div className="input">
        <span className="input__label">Email</span>
        <input
          className="input__field"
          type="email"
          placeholder="Login"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="input">
        <span className="input__label">Password</span>
        <input
          className="input__field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <section className="login__button-section">
        <BoatifyButton
          value="Log In"
          type={ButtonType.submit}
          classModifier="boatify-button--login"
        />
      </section>
      <Link className="login__forgot-password" href="/forgot-password">
        Forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;
