import BoatifyInputVariant from "@/boatify-components/BoatifyInput/BoatifyInputVariant";
import { ChangeEvent, ChangeEventHandler } from "react";
import InputType from "./InputType";

interface BoatifyInputProps {
	id?: string;
	value?: string;
	name?: string;
	label?: string;
	type?: InputType;
	placeholder?: string;
	isLongInput?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	variant?: BoatifyInputVariant;
}

export default BoatifyInputProps;
