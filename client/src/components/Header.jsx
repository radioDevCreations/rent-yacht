import "./Header.scss";
import HeaderNavigation from "./HeaderNavigation";
import Link from "next/link";

const Header = () => {
	return (
		<header className="header">
			<div className="logo">
				<Link href="/" className="logo__link">
					<img src="/sail-boat.svg" alt="logo" className="logo__image" />
					<span className="logo__text">Boatify</span>
				</Link>
			</div>
			<div className="navigation-wrapper">
				<HeaderNavigation />
				<button className="navigation-switch">Switch</button>
			</div>
		</header>
	);
};

export default Header;
