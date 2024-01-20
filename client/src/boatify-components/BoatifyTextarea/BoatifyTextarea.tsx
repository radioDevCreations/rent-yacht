import { ChangeEventHandler } from "react";
import "./BoatifyTextarea.scss";

interface BoatifyTextareaProps {
	label?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const BoatifyTextarea = ({
	label,
	placeholder,
	onChange,
}: BoatifyTextareaProps) => {
	return (
		<div className="textarea">
			<span className="textarea__label">{label}</span>
			<textarea
				className="textarea__field"
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export default BoatifyTextarea;
