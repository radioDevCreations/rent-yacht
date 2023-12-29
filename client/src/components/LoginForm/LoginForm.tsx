import "./LoginForm.scss";
import Image from "next/image";
import Link from "next/link";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "@/utilities/boatify-components/BoatifyButton/BoatifyButton";

const LoginForm = () => {
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
				<input className="input__field" type="email" placeholder="Login" />
			</div>
			<div className="input">
				<span className="input__label">Password</span>
				<input className="input__field" type="text" placeholder="Password" />
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
