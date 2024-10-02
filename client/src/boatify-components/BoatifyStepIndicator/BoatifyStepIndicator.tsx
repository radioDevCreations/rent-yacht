// import StepIndicator from "react-native-step-indicator";
import "./BoatifyStepIndicator.scss";

interface BoatifyStepIndicatorProps {
	labels: string[];
	currentPosition: number;
}

const BoatifyStepIndicator = ({
	labels,
	currentPosition,
}: BoatifyStepIndicatorProps) => {
	const customStyles = {
		stepIndicatorSize: 25,
		currentStepIndicatorSize: 30,
		separatorStrokeWidth: 2,
		currentStepStrokeWidth: 3,
		stepStrokeCurrentColor: "#fe7013",
		stepStrokeWidth: 3,
		stepStrokeFinishedColor: "#fe7013",
		stepStrokeUnFinishedColor: "#aaaaaa",
		separatorFinishedColor: "#fe7013",
		separatorUnFinishedColor: "#aaaaaa",
		stepIndicatorFinishedColor: "#fe7013",
		stepIndicatorUnFinishedColor: "#ffffff",
		stepIndicatorCurrentColor: "#ffffff",
		stepIndicatorLabelFontSize: 13,
		currentStepIndicatorLabelFontSize: 13,
		stepIndicatorLabelCurrentColor: "#fe7013",
		stepIndicatorLabelFinishedColor: "#ffffff",
		stepIndicatorLabelUnFinishedColor: "#aaaaaa",
		labelColor: "#999999",
		labelSize: 13,
		currentStepLabelColor: "#fe7013",
	};
	return (
		<div className="boatify-step-indicator">
			{/* <StepIndicator
				customStyles={customStyles}
				currentPosition={currentPosition}
				labels={labels}
			/> */}
		</div>
	);
};

export default BoatifyStepIndicator;
