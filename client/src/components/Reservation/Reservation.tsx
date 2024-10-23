"use client";
import "./Reservation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	setRegisterFirstName,
	setRegisterSurname,
	setRegisterEmail,
	setRegisterNewPassword,
	setRegisterConfirmPassword,
	setRegisterIsLoading,
} from "@/redux/slices/formsSlice";
import { ChangeEvent } from "react";
import BoatifyInputProps from "@/utilities/BoatifyInputProps";
import InputType from "@/utilities/InputType";
import httpClient from "@/axios/httpClient";
import BoatifyStepper from "@/boatify-components/BoatifyStepper/BoatifyStepper";
import RPContainer from "../RPContainer/RPContainer";

const Reservation = () => {
	const dispatch = useDispatch();
	const registerState = useSelector((state: any) => state.forms.register);
	const orderPage = useSelector((state: any) => state.order.orderPage);
	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setRegisterIsLoading(true);
		const response = await httpClient.post("//127.0.0.1:5000/register", {
			email: registerState.email,
			password: registerState.newPassword,
			firstName: registerState.firstName,
			surname: registerState.surname,
		});
		setRegisterIsLoading(false);
		if ("id" in response?.data) console.log("registered");
		else console.log("err");
	};
	const inputs: Array<BoatifyInputProps> = [
		{
			name: "First Name",
			type: InputType.text,
			placeholder: "First Name",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setRegisterFirstName(event?.target?.value)),
		},
		{
			name: "Surname",
			type: InputType.text,
			placeholder: "Surname",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setRegisterSurname(event?.target?.value)),
		},
		{
			name: "E-mail",
			type: InputType.email,
			placeholder: "E-mail",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setRegisterEmail(event?.target?.value)),
		},
		{ name: "", placeholder: "" },
		{
			name: "Password",
			type: InputType.password,
			placeholder: "Password",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setRegisterNewPassword(event?.target?.value)),
		},
		{
			name: "Confirm Password",
			type: InputType.password,
			placeholder: "Confirm Password",
			action: (event: ChangeEvent<HTMLInputElement>) =>
				dispatch(setRegisterConfirmPassword(event?.target?.value)),
		},
	];
	const steps = ["Warunki", "Daty", "Order", "Summary", "Payment"];
	return (
		<form className="reservation" onSubmit={handleSubmit}>
			<section className="reservation__board">
				<BoatifyStepper steps={steps} currentPosition={orderPage}>
					<RPContainer currentPosition={orderPage} />
				</BoatifyStepper>
			</section>
		</form>
	);
};

export default Reservation;
