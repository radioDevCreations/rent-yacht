import { ChangeEvent } from "react";

interface BoatifyTextareaProps {
	name?: string;
	placeholder?: string;
	action?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default BoatifyTextareaProps;
