"use client";
import "./RegisterForm.scss";
import Image from "next/image";
import BoatifyPagination from "../../utilities/boatify-components/BoatifyPagination/BoatifyPagination";
import BoatifyInputsCarousel from "../../utilities/boatify-components/BoatifyInputsCarousel/BoatifyInputsCarousel";
import BoatifyButton from "../../utilities/boatify-components/BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import {
	setRegisterPage,
	setRegisterFileName,
} from "@/redux/slices/formsSlice";
import { FaRegFileImage } from "react-icons/fa";
import { ChangeEvent } from "react";
import ButtonType from "@/utilities/ButtonType";

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
	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setRegisterFileName(event?.target?.value));
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log(registerState);
	};
	const inputs = [
		{ name: "First Name", type: "text", placeholder: "First Name" },
		{ name: "Surname", type: "text", placeholder: "Surname" },
		{ name: "E-mail", type: "email", placeholder: "E-mail" },
		{ name: "Address 1", type: "text", placeholder: "Address 1" },
		{ name: "Address 2", type: "text", placeholder: "Address 2" },
		{ name: "Photo", type: "file", placeholder: "Photo" },
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
					src="/profile.jpg"
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
							(input.type === "file" && (
								<div className="input-file" key={input.name}>
									<span className="input__label">{input.name}</span>
									<input
										className="input__field"
										id="photo"
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleFileInputChange}
									/>
									<label className="input__text" htmlFor="photo">
										{registerState.fileName
											? registerState.fileName
											: "Select file"}
									</label>
									<FaRegFileImage className="input__icon" />
								</div>
							)) ||
							(input.type !== "file" && (
								<div className="input" key={input.name}>
									<span className="input__label">{input.name}</span>
									<input
										className="input__field"
										type={input.type}
										placeholder={input.placeholder}
									/>
								</div>
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
