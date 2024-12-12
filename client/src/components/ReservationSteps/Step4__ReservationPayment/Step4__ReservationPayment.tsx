import ButtonType from '@/utilities/ButtonType';
import './Step4__ReservationPayment.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import BoatifySuccess from '@/boatify-components/BoatifySuccess/BoatifySuccess';

const Step4__ReservationPayment = () => {
  return (
    <div className="reservation-payment">
      <div className="pay">
        <BoatifySuccess />
        <BoatifyButton
          value="Pay"
          type={ButtonType.submit}
          classModifier="boatify-button--reservation-payment"
        />
      </div>
    </div>
  );
};

export default Step4__ReservationPayment;
