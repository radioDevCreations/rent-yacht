import { ChangeEventHandler } from "react";
import BoatifyTextareaVariant from "../BoatifyTextarea/BoatifyTextareaVariant";
import "./BoatifyTextarea.scss";

interface BoatifyTextareaProps {
	label?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
	variant?: BoatifyTextareaVariant;
}

const BoatifyTextarea = ({
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
