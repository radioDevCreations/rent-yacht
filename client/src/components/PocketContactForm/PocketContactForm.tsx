'use client';
import './PocketContactForm.scss';
import Image from 'next/image';
import IMAGE from '../../../public/links';
import Captions from '@/captions/captions';
import { useDispatch, useSelector } from 'react-redux';
import {
  setContactFirstName,
  setContactSurname,
  setContactEmail,
  setContactMessage,
} from '@/redux/slices/formsSlice';
import { ChangeEvent } from 'react';
import BoatifyInput from '@/boatify-components/BoatifyInput/BoatifyInput';
import BoatifyInputProps from '@/utilities/IBoatifyInputProps';
import BoatifyTextareaProps from '@/utilities/IBoatifyTextareaProps';
import InputType from '@/utilities/InputType';
import BoatifyTextarea from '@/boatify-components/BoatifyTextarea/BoatifyTextarea';
import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import BoatifyInputVariant from '@/boatify-components/BoatifyInput/BoatifyInputVariant';
import BoatifyTextareaVariant from '@/boatify-components/BoatifyTextarea/BoatifyTextareaVariant';
import BoatifyButtonVariant from '@/boatify-components/BoatifyButton/BoatifyButtonVariant';
import { RootState } from '@/redux/store';

const PocketContactForm = () => {
  const dispatch = useDispatch();
  const contactState = useSelector((state: RootState) => state.forms.contact);
  const firstColumn: Array<BoatifyInputProps> = [
    {
      name: 'name',
      label: Captions.CONTACT_NAME,
      type: InputType.text,
      placeholder: Captions.CONTACT_NAME,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactFirstName(event?.target?.value)),
    },
    {
      name: 'subject',
      label: Captions.CONTACT_SUBJECT,
      type: InputType.text,
      placeholder: Captions.CONTACT_SUBJECT,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactSurname(event?.target?.value)),
    },
  ];
  const secondColumn: Array<BoatifyInputProps> = [
    {
      name: 'email',
      label: Captions.CONTACT_EMAIL,
      type: InputType.email,
      placeholder: Captions.CONTACT_EMAIL,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactEmail(event?.target?.value)),
    },
  ];
  const thirdColumn: Array<BoatifyTextareaProps> = [
    {
      name: 'message',
      label: Captions.CONTACT_MESSAGE,
      placeholder: Captions.CONTACT_MESSAGE_TYPE_HERE,
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setContactMessage(event?.target?.value)),
    },
  ];

  return (
    <form className="contact">
      <input
        type="hidden"
        name="access_key"
        value={process.env.CONTACT_KEY}
      />

      <section className="contact__inputs">
        <div className="contact__inputs-column contact__inputs-column--first">
          {firstColumn.map((input) => {
            return (
              (!input.type?.length && <div></div>) ||
              (input.type?.length && (
                <BoatifyInput
                  name={input.name}
                  label={input.label}
                  key={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  onChange={input.onChange}
                  variant={BoatifyInputVariant.dark}
                />
              ))
            );
          })}
        </div>
        <div className="contact__inputs-column">
          {secondColumn.map((input) => {
            return (
              (!input.type?.length && <div></div>) ||
              (input.type?.length && (
                <BoatifyInput
                  name={input.name}
                  label={input.label}
                  key={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  onChange={input.onChange}
                  variant={BoatifyInputVariant.dark}
                />
              ))
            );
          })}
        </div>
      </section>
      <section className="contact__inputs">
        <div className="contact__inputs-column contact__inputs-column--last">
          {thirdColumn.map((input) => {
            return (
              <BoatifyTextarea
                name={input.name}
                label={input.label}
                key={input.name}
                placeholder={input.placeholder}
                onChange={input.onChange}
                variant={BoatifyTextareaVariant.dark}
              />
            );
          })}
        </div>
      </section>
      <input
        type="hidden"
        name="redirect"
        value="https://web3forms.com/success"
      ></input>
      <section className="contact__button-section">
        <BoatifyButton
          value={Captions.CONTACT_SEND_MESSAGE}
          type={ButtonType.submit}
          classModifier="boatify-button--contact"
          variant={BoatifyButtonVariant.orangeSTD}
        />
      </section>
    </form>
  );
};

export default PocketContactForm;
