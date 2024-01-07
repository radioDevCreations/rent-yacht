import { ChangeEvent } from "react";
import InputType from "./InputType";

interface BoatifyInputProps {
	name?: string;
	type?: InputType;
	placeholder?: string;
	action?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default BoatifyInputProps;
