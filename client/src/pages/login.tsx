import "./login.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import LoginForm from "../components/LoginForm/LoginForm";
import BoatifyLinkProps from "@/utilities/BoatifyLinkProps";

const LoginPage = ({ data }: any) => {
	const problem = "Don't have an account yet? ";
	const linkProps: BoatifyLinkProps = {
		href: "/register",
		linkText: "Register",
	};
	return (
		<SingleFormLayout problem={problem} link={linkProps}>
			<section className="login-page">
				<LoginForm />
			</section>
		</SingleFormLayout>
	);
};

export default LoginPage;
