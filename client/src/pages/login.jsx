import "./login.scss";
import SingleFormLayout from "../layouts/SingleFormLayout/SingleFormLayout";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ data }) => {
	const problem = "Cannot log in?";
	return (
		<SingleFormLayout problem={problem}>
			<section className="login-page">
				<LoginForm />
			</section>
		</SingleFormLayout>
	);
};

export default LoginPage;
