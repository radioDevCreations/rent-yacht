import "./LoginForm.scss";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
	return (
		<form className="login">
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
			<Link className="login__forgot-password" href="/forgot-password">
				Forgot password?
			</Link>
		</form>
	);
};

export default LoginForm;
