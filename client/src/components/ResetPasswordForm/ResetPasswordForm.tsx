import BoatifyButton from "@/boatify-components/BoatifyButton/BoatifyButton";
import ButtonType from "@/utilities/ButtonType";
import "./ResetPasswordForm.scss";

const ResetPasswordForm = () => {
	return (
		<form className="reset-password">
			<span className="reset-password__label">
				Provide a new password for exampleemail@example.com
			</span>
			{/* <span className="reset-password__read-more">
					You should receive message up to 5 minutes. If you can't find it try
					again or contact our support.
				</span> */}

			<div className="input">
				<span className="input__label">Password</span>
				<input
					className="input__field"
					type="password"
					placeholder="Password"
				/>
			</div>
			<div className="input">
				<span className="input__label">Confirm password</span>
				<input
					className="input__field"
					type="password"
					placeholder="Confirm password"
				/>
			</div>
			<section className="reset-password__button-section">
				<BoatifyButton
					value="Reset Password"
					type={ButtonType.submit}
					classModifier="boatify-button--reset-password"
				/>
			</section>
		</form>
	);
};

export default ResetPasswordForm;
