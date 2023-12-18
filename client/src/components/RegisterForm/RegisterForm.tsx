import "./RegisterForm.scss";
import Image from "next/image";
import BoatifyPagination from "../BoatifyPagination/BoatifyPagination";
import BoatifyInputsCarousel from "../BoatifyInputsCarousel/BoatifyInputsCarousel";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterPage, setFileName } from "@/redux/slices/registerSlice";
import { FaRegFileImage } from "react-icons/fa";
import { ChangeEvent } from "react";

const REGISTER_PAGES_NUMBER = 3;
const NODES_PER_PAGE = 2;

const RegisterForm = () => {
	const dispatch = useDispatch();
	const registerState = useSelector((state: any) => state.register);
	const handlePrevPage = () => {
		if (registerState.registerPageNumber > 1) {
			dispatch(setRegisterPage(registerState.registerPageNumber - 1));
		}
	};
	const handleNextPage = () => {
		if (registerState.registerPageNumber < REGISTER_PAGES_NUMBER) {
			dispatch(setRegisterPage(registerState.registerPageNumber + 1));
		}
	};
	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setFileName(event?.target?.value));
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
		registerState.registerPageNumber === REGISTER_PAGES_NUMBER
			? "register__button-section"
			: "register__button-section register__button-section--hidden";
	return (
		<form className="register">
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
										{registerState.registerFileName
											? registerState.registerFileName
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
					currentPage={registerState.registerPageNumber}
					nodesPerPage={NODES_PER_PAGE}
				/>
			</section>
			<section className={buttonSectionClass}>
				<button
					type="submit"
					className="register__button"
					disabled={registerState.registerPageNumber !== 3}
				>
					Register
				</button>
			</section>
			<BoatifyPagination
				currentPage={registerState.registerPageNumber}
				numberOfPages={REGISTER_PAGES_NUMBER}
				prevPage={handlePrevPage}
				nextPage={handleNextPage}
			/>
		</form>
	);
};

export default RegisterForm;
