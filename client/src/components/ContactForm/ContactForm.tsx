'use client';
import './ContactForm.scss';
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

const ContactForm = () => {
  const dispatch = useDispatch();
  const contactState = useSelector((state: any) => state.forms.contact);
  const firstColumn: Array<BoatifyInputProps> = [
    {
      name: 'name',
      label: 'Name',
      type: InputType.text,
      placeholder: 'Name',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactFirstName(event?.target?.value)),
    },
    {
      name: 'subject',
      label: 'Subject',
      type: InputType.text,
      placeholder: 'Subject',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactSurname(event?.target?.value)),
    },
  ];
  const secondColumn: Array<BoatifyInputProps> = [
    {
      name: 'email',
      label: 'E-mail',
      type: InputType.email,
      placeholder: 'E-mail',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setContactEmail(event?.target?.value)),
    },
  ];
  const thirdColumn: Array<BoatifyTextareaProps> = [
    {
      name: 'message',
      label: 'Message',
      placeholder: 'Type here',
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(setContactMessage(event?.target?.value)),
    },
  ];

  return (
    <form
      className="contact"
      action="https://api.web3forms.com/submit"
      method="POST"
    >
      <input
        type="hidden"
        name="access_key"
        value="90c62b69-349f-49b5-a3e4-e2a1b4c0159f"
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
          value="Send Message"
          type={ButtonType.submit}
          classModifier="boatify-button--login"
        />
      </section>
    </form>
  );
};

export default ContactForm;
