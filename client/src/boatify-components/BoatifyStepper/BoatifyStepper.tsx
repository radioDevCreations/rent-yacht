import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import { setReservationPage } from "@/redux/slices/reservationSlice";
import "./BoatifyStepper.scss";
import Children from "@/utilities/Children";

interface BoatifyStepperProps extends Children {
	steps: string[];
	currentPosition: number;
}

const BoatifyStepper = ({
	steps,
	currentPosition,
	children,
}: BoatifyStepperProps) => {
	const dispatch = useDispatch();
	const reservationState = useSelector((state: any) => state.reservation);
	const handlePreviousReservationPage = () => {
		console.log(reservationState.new_ReservationPage - 1);
		dispatch(setReservationPage(reservationState.new_ReservationPage - 1));
	};
	const handleNextReservationPage = () => {
		console.log(reservationState.new_ReservationPage + 1);
		dispatch(setReservationPage(reservationState.new_ReservationPage + 1));
	};
	return (
		<div className="boatify-stepper">
			<div className="boatify-stepper__indicator">
				{steps.map((step, index) => {
					return (
						<div
							key={index}
							className={`boatify-stepper__step ${
								currentPosition === index + 1 && "boatify-stepper__step--active"
							} ${
								index + 1 < currentPosition && "boatify-stepper__step--complete"
							}`}
						>
							<span className="boatify-stepper__step-number">{index + 1}</span>
							<p className="boatify-stepper__step-text text-gray-500">{step}</p>
						</div>
					);
				})}
			</div>
			{children}

			{currentPosition <= steps.length - 2 && currentPosition != 2 ?
			<div className="boatify-stepper__buttons">
				<BoatifyButton
					value="Previous"
					type={ButtonType.button}
					classModifier="boatify-button--stepper-prev"
					onClick={handlePreviousReservationPage}
					disabled={currentPosition <= 1}
				/>
				<BoatifyButton
					value="Next"
					type={ButtonType.button}
					classModifier="boatify-button--stepper-next"
					onClick={handleNextReservationPage}
					disabled={currentPosition >= steps.length}
				/>
			</div> : <div></div>}
		</div>
	);
};

export default BoatifyStepper;
