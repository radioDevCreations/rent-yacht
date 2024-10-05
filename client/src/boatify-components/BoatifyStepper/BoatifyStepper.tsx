// import StepIndicator from "react-native-step-indicator";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import "./BoatifyStepper.scss";

interface BoatifyStepperProps {
	steps: string[];
	currentPosition: number;
}

const BoatifyStepper = ({ steps, currentPosition }: BoatifyStepperProps) => {
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
				/>
				<BoatifyButton
					value="Next"
					type={ButtonType.button}
					classModifier="boatify-button--stepper-next"
				/>
			</div>
		</div>
	);
};

export default BoatifyStepper;
