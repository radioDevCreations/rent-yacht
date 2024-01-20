import InputType from "@/utilities/InputType";
import { ChangeEventHandler } from "react";
import "./BoatifyInput.scss";

interface BoatifyInputProps {
	label?: string;
	type?: InputType;
	placeholder?: string;
	isLongInput?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const BoatifyInput = ({
	label,
	type,
	placeholder,
	isLongInput = false,
	onChange,
}: BoatifyInputProps) => {
	const inputClass = isLongInput ? "input-long" : "input";
	return (
		<div className={inputClass}>
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
