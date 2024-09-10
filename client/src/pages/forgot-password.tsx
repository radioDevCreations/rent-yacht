import "./forgot-password.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import BoatifyLinkProps from "@/utilities/BoatifyLinkProps";

const ForgotPassword = ({ data }: any) => {
	const problem = "Still can't log in? Contact ";
	const linkProps: BoatifyLinkProps = { href: "/contact", linkText: "support" };
	return (
		<SingleFormLayout problem={problem} link={linkProps}>
			<section className="forgot-password-page">
				<ForgotPasswordForm />
			</section>
		</SingleFormLayout>
	);
};

export default ForgotPassword;
