// import StepIndicator from "react-native-step-indicator";
import "./BoatifyStepper.scss";

interface BoatifyStepperProps {
	steps: string[];
	currentPosition: number;
}

const BoatifyStepper = ({ steps, currentPosition }: BoatifyStepperProps) => {
	return (
		<div className="boatify-stepper flex">
			{steps.map((step, index) => {
				return (
					<div key={index} className="boatify-stepper__step">
						<span className="boatify-stepper__step-number">{index + 1}</span>
						<p className="boatify-stepper__step-text text-gray-500">{step}</p>
					</div>
				);
			})}
		</div>
	);
};

export default BoatifyStepper;
