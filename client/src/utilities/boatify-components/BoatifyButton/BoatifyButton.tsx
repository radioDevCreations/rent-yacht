import "./BoatifyButton.scss";
import ButtonType from "@/utilities/ButtonType";

interface BoatifyButtonProps {
	value: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: ButtonType;
	disabled?: boolean;
	classModifier?: string;
}

const BoatifyButton = ({
	value,
	onClick,
	type = ButtonType.submit,
	disabled,
	classModifier,
}: BoatifyButtonProps) => {
	return (
		<button
			type={type}
			className={`boatify-button ${classModifier ? classModifier : ""}`}
			disabled={disabled}
			onClick={onClick}
		>
			{value}
		</button>
	);
};

export default BoatifyButton;
