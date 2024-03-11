import InputType from "@/utilities/InputType";
import { ChangeEventHandler } from "react";
import "./BoatifyInput.scss";

interface BoatifyInputProps {
	id?: string;
	value?: string;
	name?: string;
	label?: string;
	type?: InputType;
	placeholder?: string;
	isLongInput?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const BoatifyInput = ({
	id,
	value,
	name,
	label,
	type,
	placeholder,
	isLongInput = false,
	onChange,
}: BoatifyInputProps) => {
	const inputClass = isLongInput ? "input-long" : "input";
	return (
		<div className={type === "radio" ? `${inputClass} radio` : inputClass}>
			{id ? (
				<label htmlFor={id} className="input__label">
					{label}
				</label>
			) : (
				<span className="input__label">{label}</span>
			)}
			<input
				id={id}
				value={value}
				name={name}
				className="input__field"
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyInput;
