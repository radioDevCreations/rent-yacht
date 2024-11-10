import BoatifyInputVariant from "@/boatify-components/BoatifyInput/BoatifyInputVariant";
import { ChangeEvent, ChangeEventHandler } from "react";
import IBoatifyElement from "./IBoatifyElement";
import InputType from "./InputType";

interface IBoatifyInputProps extends IBoatifyElement {
	value?: string;
	type?: InputType;
	placeholder?: string;
	isLongInput?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	variant?: BoatifyInputVariant;
}

export default IBoatifyInputProps;
