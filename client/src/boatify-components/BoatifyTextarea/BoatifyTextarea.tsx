import BoatifyTextareaProps from "@/utilities/BoatifyTextareaProps";
import { ChangeEventHandler } from "react";
import BoatifyTextareaVariant from "../BoatifyTextarea/BoatifyTextareaVariant";
import "./BoatifyTextarea.scss";

const BoatifyTextarea = ({
	name,
	label,
	placeholder,
	onChange,
	variant,
}: BoatifyTextareaProps) => {
	return (
		<div className="textarea">
			<span
				className={`textarea__label ${
					variant === BoatifyTextareaVariant.dark ? "textarea__label--dark" : ""
				}`}
			>
				{label}
			</span>
			<textarea
				name={name}
				className={`textarea__field ${
					variant === BoatifyTextareaVariant.dark ? "textarea__field--dark" : ""
				}`}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyTextarea;
