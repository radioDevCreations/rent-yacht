import "./forgot-password.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword = ({ data }) => {
	const problem = "Still can't log in?";
	return (
		<SingleFormLayout problem={problem}>
			<section className="forgot-password-page">
				<ForgotPasswordForm />
			</section>
		</SingleFormLayout>
	);
};

export default ForgotPassword;
