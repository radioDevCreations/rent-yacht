"use client";
import "./ContactForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/redux/slices/contactSlice";
import { ChangeEvent } from "react";
import BoatifyInputsCarousel from "../../utilities/boatify-components/BoatifyInputsCarousel/BoatifyInputsCarousel";
import { FaRegFileImage } from "react-icons/fa";

const ContactForm = () => {
	const dispatch = useDispatch();
	const contactState = useSelector((state: any) => state.contact);
	const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event?.target?.value));
	};
	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setFileName(event?.target?.value));
	};
	const inputs = [
		{ name: "First Name", type: "text", placeholder: "First Name" },
		{ name: "Surname", type: "text", placeholder: "Surname" },
		{ name: "E-mail", type: "email", placeholder: "E-mail" },
		{
			name: "Message",
			type: "text",
			placeholder: "Describe your problem here",
		},
		{ name: "Attachment", type: "file", placeholder: "Attach" },
	];
	const NODES_PER_PAGE = inputs.length;
	return (
		<form className="contact">
			<section className="contact__inputs">
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
										{contactState.registerFileName
											? contactState.registerFileName
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
					currentPage={contactState.registerPageNumber}
					nodesPerPage={NODES_PER_PAGE}
				/>
			</section>
			<section className="contact__button-section">
				<button
					type="submit"
					className="contact__button"
					disabled={contactState.registerPageNumber !== 3}
				>
					Send Message
				</button>
			</section>
		</form>
	);
};

export default ContactForm;
