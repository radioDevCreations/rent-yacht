import BoatifyTextareaVariant from "@/boatify-components/BoatifyTextarea/BoatifyTextareaVariant";
import { ChangeEvent } from "react";

interface BoatifyTextareaProps {
	name?: string;
	label?: string;
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => any;
	variant?: BoatifyTextareaVariant;
}

export default BoatifyTextareaProps;
