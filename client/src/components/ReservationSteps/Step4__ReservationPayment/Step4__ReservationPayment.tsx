import ButtonType from '@/utilities/ButtonType';
import './Step4__ReservationPayment.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';

const Step4__ReservationPayment = () => {
  return (
    <div className="reservation-summary">
      <BoatifyButton
        value="Pay"
        type={ButtonType.submit}
        classModifier="boatify-button--reservation"
      />
    </div>
  );
};

export default Step4__ReservationPayment;
