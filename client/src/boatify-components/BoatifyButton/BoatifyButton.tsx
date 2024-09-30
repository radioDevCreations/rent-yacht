import "./BoatifyButton.scss";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButtonVariant from "./BoatifyButtonVariant";

interface BoatifyButtonProps {
	value: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: ButtonType;
	disabled?: boolean;
	classModifier?: string;
	variant?: BoatifyButtonVariant;
}

const BoatifyButton = ({
	value,
	onClick,
	type = ButtonType.submit,
	disabled,
	classModifier,
	variant,
}: BoatifyButtonProps) => {
	let variantClass = "";
	switch (variant) {
		case BoatifyButtonVariant.orangeSTD:
			variantClass = "boatify-button--orange";
	}

	return (
		<button
			type={type}
			className={`boatify-button ${classModifier ? classModifier : ""} 
			${variantClass ? variantClass : ""}`}
			disabled={disabled}
			onClick={onClick}
		>
			{value}
		</button>
	);
};

export default BoatifyButton;
