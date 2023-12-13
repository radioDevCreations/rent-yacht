import "./reset-password.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";

const ResetPassword = ({ data }) => {
	return (
		<SingleFormLayout>
			<section className="reset-password-page">
				<ResetPasswordForm />
			</section>
		</SingleFormLayout>
	);
};

export default ResetPassword;
