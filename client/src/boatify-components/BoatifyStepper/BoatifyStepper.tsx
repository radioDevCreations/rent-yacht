import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import { setOrderPage } from "@/redux/slices/orderSlice";
import "./BoatifyStepper.scss";

interface BoatifyStepperProps {
	steps: string[];
	currentPosition: number;
}

const BoatifyStepper = ({ steps, currentPosition }: BoatifyStepperProps) => {
	const dispatch = useDispatch();
	const orderState = useSelector((state: any) => state.order);
	const handlePreviousOrderPage = () => {
		console.log(orderState.orderPage - 1);
		dispatch(setOrderPage(orderState.orderPage - 1));
	};
	const handleNextOrderPage = () => {
		console.log(orderState.orderPage + 1);
		dispatch(setOrderPage(orderState.orderPage + 1));
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
			<div className="boatify-stepper__buttons">
				<BoatifyButton
					value="Previous"
					type={ButtonType.button}
					classModifier="boatify-button--stepper-prev"
					onClick={handlePreviousOrderPage}
				/>
				<BoatifyButton
					value="Next"
					type={ButtonType.button}
					classModifier="boatify-button--stepper-next"
					onClick={handleNextOrderPage}
				/>
			</div>
		</div>
	);
};

export default BoatifyStepper;
