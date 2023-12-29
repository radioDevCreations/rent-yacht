import "./LoginForm.scss";
import { ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "@/utilities/boatify-components/BoatifyButton/BoatifyButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoginEmail, setLoginPassword } from "@/redux/slices/formsSlice";

const LoginForm = () => {
	const dispatch = useDispatch();
	const loginState = useSelector((state: any) => state.forms.login);
	const handleLoginEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setLoginEmail(event?.target?.value));
	};
	const handleLoginPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setLoginPassword(event?.target?.value));
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log(loginState);
	};
	return (
		<form className="login" onSubmit={handleSubmit}>
			<figure className="profile">
				<Image
					className="profile__picture"
					src="/profile.jpg"
					alt="Profile Picture"
					width={80}
					height={80}
				/>
				<figcaption className="profile__label"></figcaption>
			</figure>
			<div className="input">
				<span className="input__label">Email</span>
				<input
					className="input__field"
					type="email"
					placeholder="Login"
					onChange={handleLoginEmailChange}
				/>
			</div>
			<div className="input">
				<span className="input__label">Password</span>
				<input
					className="input__field"
					type="password"
					placeholder="Password"
					onChange={handleLoginPasswordChange}
				/>
			</div>
			<section className="login__button-section">
				<BoatifyButton
					value="Log In"
					type={ButtonType.submit}
					classModifier="boatify-button--login"
				/>
			</section>
			<Link className="login__forgot-password" href="/forgot-password">
				Forgot password?
			</Link>
		</form>
	);
};

export default LoginForm;
