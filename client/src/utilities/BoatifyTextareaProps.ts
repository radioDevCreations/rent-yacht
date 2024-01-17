import { ChangeEvent } from "react";

interface BoatifyTextareaProps {
	name?: string;
	placeholder?: string;
	action?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default BoatifyTextareaProps;
