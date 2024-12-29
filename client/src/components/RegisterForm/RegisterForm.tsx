'use client';
import './RegisterForm.scss';
import Image from 'next/image';
import BoatifyPagination from '../../boatify-components/BoatifyPagination/BoatifyPagination';
import BoatifyButton from '../../boatify-components/BoatifyButton/BoatifyButton';
import { useState, ChangeEvent } from 'react';
import ButtonType from '@/utilities/ButtonType';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import InputType from '@/utilities/InputType';
import IMAGE from '../../../public/links';
import Role from '@/utilities/Role';
import BoatifyPicklist from '@/boatify-components/BoatifyPicklist/BoatifyPicklist';
import BoatifyDatePicker from '@/boatify-components/BoatifyDatePicker/BoatifyDatePicker';
import moment from 'moment';
import DataLoader from '@/dataLoaders/DataLoader';

const REGISTER_PAGES_NUMBER = 4;

const RegisterForm = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role | null>(Role.Client);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
  
    if (!firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!surname.trim()) newErrors.surname = 'Surname is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!role) newErrors.role = 'Role is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!newPassword.trim()) newErrors.newPassword = 'Password is required';
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < REGISTER_PAGES_NUMBER) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as Role);
    console.log('Selected Role:', value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!validateInputs()) return;
  
    setIsLoading(true);
    try {
      const response = await DataLoader.registerUser({
        email,
        password: newPassword,
        confirmedPassword: confirmPassword,
        firstName,
        lastName: surname,
        dateOfBirth: dateOfBirth ? moment(dateOfBirth).toISOString() : null,
        roleName: role
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSectionClass =
    pageNumber === REGISTER_PAGES_NUMBER
      ? 'register__button-section'
      : 'register__button-section register__button-section--hidden';

  const roleOptions = [
    Role.Client,
    Role.Shipowner
  ];

  return (
    <form className="register" onSubmit={handleSubmit}>
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
      <section className="register__inputs">
        {pageNumber === 1 &&
        <div className="page">
          <BoatifyInput
            label="First Name"
            placeholder="First Name"
            type={InputType.text}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value)
            }
          />
          <BoatifyInput
            label="Surname"
            placeholder="Surname"
            type={InputType.text}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSurname(event.target.value)
            }
          />
        </div>}
        {pageNumber === 2 &&
        <div className="page">
          <BoatifyInput
            label="E-mail"
            placeholder="E-mail"
            type={InputType.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
          <BoatifyPicklist 
            label={'Role'} 
            options={roleOptions.map((role: Role) => ({ label: role, value: role }))} 
            value={role || ''}
            onChange={handleRoleChange}
          />
        </div>}
        {pageNumber === 3 &&
        <div className="page page--long">
          <BoatifyDatePicker
              selectedDate={dateOfBirth}
              onDateChange={(date: Date | null) => {
                setDateOfBirth(date);
              } } busyDates={null}          />
         </div>}
        {pageNumber === 4 &&
        <div className="page">
          <BoatifyInput
            label="Password"
            placeholder="Password"
            type={InputType.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(event.target.value)
            }
          />
          <BoatifyInput
            label="Confirm Password"
            placeholder="Confirm Password"
            type={InputType.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(event.target.value)
            }
          />
        </div>}
      </section>
      <section className={buttonSectionClass}>
        <BoatifyButton
          value="Register"
          type={ButtonType.submit}
          classModifier="boatify-button--register"
          disabled={pageNumber !== 4}
        />
      </section>
      <div className="errors-section">
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        {errors.surname && <p className="error">{errors.surname}</p>}
        {errors.email && <p className="error">{errors.email}</p>}
        {errors.role && <p className="error">{errors.role}</p>}
        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>
      <BoatifyPagination
        currentPage={pageNumber}
        numberOfPages={REGISTER_PAGES_NUMBER}
        prevPage={handlePrevPage}
        nextPage={handleNextPage}
      />
    </form>
  );
};

export default RegisterForm;