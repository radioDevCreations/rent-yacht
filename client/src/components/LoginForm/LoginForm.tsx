import "./LoginForm.scss";
import Image from "next/image";

const LoginForm = () => {
	return (
		<form className="login">
			<figure className="profile">
				<Image
					className="profile__picture"
					src="/profile.jpg"
					alt="Profile Picture"
					width={64}
					height={64}
				/>
				<figcaption className="profile__label"></figcaption>
			</figure>
			<input className="login__input" type="text" />
			<input className="login__input" type="text" />
		</form>
	);
};

export default LoginForm;
