import InputType from "@/utilities/InputType";
import { ChangeEventHandler } from "react";
import "./BoatifyInput.scss";

interface BoatifyInputProps {
	label?: string;
	type?: InputType;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const BoatifyInput = ({
	label,
	type,
	placeholder,
	onChange,
}: BoatifyInputProps) => {
	return (
		<div className="input">
			<span className="input__label">{label}</span>
			<input
				className="input__field"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyInput;
