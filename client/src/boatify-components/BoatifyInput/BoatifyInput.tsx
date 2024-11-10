import IBoatifyInputProps from "@/utilities/IBoatifyInputProps";
import InputType from "@/utilities/InputType";
import { ChangeEventHandler } from "react";
import "./BoatifyInput.scss";
import BoatifyInputVariant from "./BoatifyInputVariant";

const BoatifyInput = ({
	id,
	value,
	name,
	label,
	type,
	placeholder,
	isLongInput = false,
	onChange,
	variant,
}: IBoatifyInputProps) => {
	const inputClass = isLongInput ? "input-long" : "input";
	return (
		<div className={type === "radio" ? `${inputClass} radio` : inputClass}>
			{id ? (
				<label
					htmlFor={id}
					className={`input__label ${
						variant === BoatifyInputVariant.dark ? "input__label--dark" : ""
					}`}
				>
					{label}
				</label>
			) : (
				<span
					className={`input__label ${
						variant === BoatifyInputVariant.dark ? "input__label--dark" : ""
					}`}
				>
					{label}
				</span>
			)}
			<input
				id={id}
				value={value}
				name={name}
				className={`input__field ${
					variant === BoatifyInputVariant.dark ? "input__field--dark" : ""
				}`}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyInput;
