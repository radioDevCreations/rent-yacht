import ButtonType from '@/utilities/ButtonType';
import './Step4__ReservationSummary.scss';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';

const Step4__ReservationSummary = () => {
    return ( <div className="reservation-summary">
        <BoatifyButton
					value="Make Reservation"
					type={ButtonType.button}
					classModifier="boatify-button--reservation"
				/>
    </div> );
}
 
export default Step4__ReservationSummary;