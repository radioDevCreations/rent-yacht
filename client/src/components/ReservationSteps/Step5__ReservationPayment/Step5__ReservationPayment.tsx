import ButtonType from '@/utilities/ButtonType';
import './Step5__ReservationPayment.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';

const Step5__ReservationPayment = () => {
    return ( <div className="reservation-summary">
        <BoatifyButton
					value="Pay"
					type={ButtonType.submit}
					classModifier="boatify-button--reservation"
				/>
    </div> );
}
 
export default Step5__ReservationPayment;