"use client";
import "./ContactForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	setContactFirstName,
	setContactSurname,
	setContactEmail,
	setContactMessage,
} from "@/redux/slices/formsSlice";
import { ChangeEvent } from "react";
import BoatifyInput from "@/boatify-components/BoatifyInput/BoatifyInput";
import BoatifyInputProps from "@/utilities/BoatifyInputProps";
import BoatifyTextareaProps from "@/utilities/BoatifyTextareaProps";
import InputType from "@/utilities/InputType";
import BoatifyTextarea from "@/boatify-components/BoatifyTextarea/BoatifyTextarea";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "@/boatify-components/BoatifyButton/BoatifyButton";

const ContactForm = () => {
	const dispatch = useDispatch();
	const contactState = useSelector((state: any) => state.forms.contact);
	const firstColumn: Array<BoatifyInputProps> = [
		{
			name: "First Name",
			type: InputType.text,
			placeholder: "First Name",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setContactFirstName(event?.target?.value)),
		},
		{
			name: "Surname",
			type: InputType.text,
			placeholder: "Surname",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setContactSurname(event?.target?.value)),
		},
	];
	const secondColumn: Array<BoatifyInputProps> = [
		{
			name: "E-mail",
			type: InputType.email,
			placeholder: "E-mail",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setContactEmail(event?.target?.value)),
		},
	];
	const thirdColumn: Array<BoatifyTextareaProps> = [
		{
			name: "Message",
			placeholder: "Type here",
			action: (event: ChangeEvent<HTMLTextAreaElement>) =>
				dispatch(setContactMessage(event?.target?.value)),
		},
	];

	return (
		<form className="contact">
			<section className="contact__inputs">
				<div className="contact__inputs-column contact__inputs-column--first">
					{firstColumn.map((input) => {
						return (
							(!input.type?.length && <div></div>) ||
							(input.type?.length && (
								<BoatifyInput
									label={input.name}
									key={input.name}
									placeholder={input.placeholder}
									type={input.type}
									onChange={input.action}
								/>
							))
						);
					})}
				</div>
				<div className="contact__inputs-column">
					{secondColumn.map((input) => {
						return (
							(!input.type?.length && <div></div>) ||
							(input.type?.length && (
								<BoatifyInput
									label={input.name}
									key={input.name}
									placeholder={input.placeholder}
									type={input.type}
									onChange={input.action}
								/>
							))
						);
					})}
				</div>
			</section>
			<section className="contact__inputs">
				<div className="contact__inputs-column contact__inputs-column--last">
					{thirdColumn.map((input) => {
						return (
							<BoatifyTextarea
								label={input.name}
								key={input.name}
								placeholder={input.placeholder}
								onChange={input.action}
							/>
						);
					})}
				</div>
			</section>
			<section className="contact__button-section">
				<BoatifyButton
					value="Send Message"
					type={ButtonType.submit}
					classModifier="boatify-button--login"
				/>
			</section>
		</form>
	);
};

export default ContactForm;
