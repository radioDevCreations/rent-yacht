import "./ForgotPasswordForm.scss";

const ForgotPasswordForm = () => {
	return (
		<form className="forgot-password">
			<div className="forgot-password__form">
				<span className="forgot-password__label">
					Provide your e-mail address to which we will send an e-mail to reset
					your password.
				</span>
				{/* <span className="forgot-password__read-more">
					You should receive message up to 5 minutes. If you can't find it try
					again or contact our support.
				</span> */}
				<input
					className="forgot-password__input"
					type="text"
					placeholder="E-mail..."
				/>
				<button className="forgot-password__button">Send E-mail</button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
