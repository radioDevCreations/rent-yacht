"use client";
import "./RegisterForm.scss";
import Image from "next/image";
import BoatifyPagination from "../../boatify-components/BoatifyPagination/BoatifyPagination";
import BoatifyInputsCarousel from "../../boatify-components/BoatifyInputsCarousel/BoatifyInputsCarousel";
import BoatifyButton from "../../boatify-components/BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import {
	setRegisterPage,
	setRegisterFirstName,
	setRegisterSurname,
	setRegisterEmail,
	setRegisterNewPassword,
	setRegisterConfirmPassword,
	setRegisterIsLoading,
} from "@/redux/slices/formsSlice";
import { ChangeEvent } from "react";
import ButtonType from "@/utilities/ButtonType";
import BoatifyInput from "@/boatify-components/BoatifyInput/BoatifyInput";
import BoatifyInputProps from "@/utilities/BoatifyInputProps";
import InputType from "@/utilities/InputType";
import httpClient from "@/axios/httpClient";
import IMAGE from "../../../public/links";

const REGISTER_PAGES_NUMBER = 3;
const NODES_PER_PAGE = 2;

const RegisterForm = () => {
	const dispatch = useDispatch();
	const registerState = useSelector((state: any) => state.forms.register);
	const handlePrevPage = () => {
		if (registerState.pageNumber > 1) {
			dispatch(setRegisterPage(registerState.pageNumber - 1));
		}
	};
	const handleNextPage = () => {
		if (registerState.pageNumber < REGISTER_PAGES_NUMBER) {
			dispatch(setRegisterPage(registerState.pageNumber + 1));
		}
	};
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
	const buttonSectionClass =
		registerState.pageNumber === REGISTER_PAGES_NUMBER
			? "register__button-section"
			: "register__button-section register__button-section--hidden";
	return (
		<form className="register" onSubmit={handleSubmit}>
			<figure className="profile">
				<Image
					className="profile__picture"
					src={IMAGE.jpg.profile}
					alt="Profile Picture"
					width={80}
					height={80}
				/>
				<figcaption className="profile__label"></figcaption>
			</figure>
			<section className="register__inputs">
				<BoatifyInputsCarousel
					nodes={inputs.map((input) => {
						return (
							(!input.type?.length && <div key={input.name}></div>) ||
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
					currentPage={registerState.pageNumber}
					nodesPerPage={NODES_PER_PAGE}
				/>
			</section>
			<section className={buttonSectionClass}>
				<BoatifyButton
					value="Register"
					type={ButtonType.submit}
					classModifier="boatify-button--register"
					disabled={registerState.pageNumber !== 3}
				/>
			</section>
			<BoatifyPagination
				currentPage={registerState.pageNumber}
				numberOfPages={REGISTER_PAGES_NUMBER}
				prevPage={handlePrevPage}
				nextPage={handleNextPage}
			/>
		</form>
	);
};

export default RegisterForm;
