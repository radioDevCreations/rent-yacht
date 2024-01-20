import "./ForgotPasswordForm.scss";
import BoatifyButton from "@/boatify-components/BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import { setForgotPasswordEmail } from "@/redux/slices/formsSlice";
import { ChangeEvent } from "react";
import ButtonType from "@/utilities/ButtonType";

const ForgotPasswordForm = () => {
	const dispatch = useDispatch();
	const forgotPasswordState = useSelector(
		(state: any) => state.forms.forgotPassword
	);
	const handleForgotPasswordEmailChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setForgotPasswordEmail(event?.target?.value));
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log(forgotPasswordState);
	};
	return (
		<form className="forgot-password" onSubmit={handleSubmit}>
			<span className="forgot-password__label">
				Provide your e-mail address to which we will send an e-mail to reset
				your password.
			</span>
			{/* <span className="forgot-password__read-more">
					You should receive message up to 5 minutes. If you can't find it try
					again or contact our support.
				</span> */}

			<div className="input">
				<input
					className="input__field"
					type="email"
					placeholder="E-mail"
					onChange={handleForgotPasswordEmailChange}
				/>
			</div>
			<section className="forgot-password__button-section">
				<BoatifyButton
					value="Send E-mail"
					type={ButtonType.submit}
					classModifier="boatify-button--forgot-password"
				/>
			</section>
		</form>
	);
};

export default ForgotPasswordForm;
