import "./reset-password.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";
import BoatifyLinkProps from "@/utilities/BoatifyLinkProps";

const ResetPassword = ({ data }: any) => {
	const problem = "Or contact ";
	const linkProps: BoatifyLinkProps = { href: "/email", linkText: "support" };
	return (
		<SingleFormLayout problem={problem} link={linkProps}>
			<section className="reset-password-page">
				<ResetPasswordForm />
			</section>
		</SingleFormLayout>
	);
};

export default ResetPassword;
