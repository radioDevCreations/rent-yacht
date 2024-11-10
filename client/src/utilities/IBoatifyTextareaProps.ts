import BoatifyTextareaVariant from "@/boatify-components/BoatifyTextarea/BoatifyTextareaVariant";
import { ChangeEvent } from "react";
import BoatifyInputProps from "./IBoatifyInputProps";
import IBoatifyElement from "./IBoatifyElement";

interface IBoatifyTextareaProps extends IBoatifyElement {
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => any;
	variant?: BoatifyTextareaVariant;
}

export default IBoatifyTextareaProps;
