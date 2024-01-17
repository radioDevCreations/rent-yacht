import { ChangeEventHandler } from "react";
import "./BoatifyInput.scss";

interface BoatifyTextareaProps {
	label?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const BoatifyTextarea = ({
	label,
	placeholder,
	onChange,
}: BoatifyTextareaProps) => {
	return (
		<div className="input">
			<span className="input__label">{label}</span>
			<input
				className="input__field"
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyTextarea;
