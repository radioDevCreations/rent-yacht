import ButtonType from '@/utilities/ButtonType';
import './Step4__ReservationPayment.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import BoatifySuccess from '@/boatify-components/BoatifySuccess/BoatifySuccess';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import PayPalButton from '@/payment-components/PayPalButton/PayPalButton';
import { BoatifyWindowReload } from '@/utilities/BoatifyGoTo';
import { useState } from 'react';
import { SystemBoolean } from '@/utilities/System';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Step4__ReservationPayment = () => {
  const [paymentStarted, setPaymentStarted] = useState<boolean>(SystemBoolean.False);
  let reservationId = useSelector((state: RootState) => state.reservation.new_ReservationData.reservationId);

  return (
    <div className="reservation-payment">
      <div className="pay">
        <div className="success-wrapper">
          <BoatifySuccess />
        </div>
        <BoatifyButton
          value="Pay"
          type={ButtonType.button}
          classModifier="boatify-button--reservation-payment"
          onClick={() => setPaymentStarted(SystemBoolean.True)}
        />
      </div>
      {paymentStarted &&<div className="payment" onClick={(e: React.MouseEvent) => {e.stopPropagation(); BoatifyWindowReload(); }}>
      <div className="payment-tab" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button
          className="reservation-details__navigation-switch"
          onClick={() => BoatifyWindowReload()}
        >
          <IoMdCloseCircleOutline />
        </button>
        <PayPalButton reservationId={reservationId} />
      </div>
    </div>}
    </div>
  );
};

export default Step4__ReservationPayment;
