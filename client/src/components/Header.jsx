import style from "./Header.module.scss";
import { Rubik_Distressed } from "next/font/google";

const Header = () => {
	return (
		<header className={style.header}>
			<img src="/sail-boat.svg" alt="logo" className={style.logo} />
			<span className={style.header__text}>Boatify</span>
		</header>
	);
};

export default Header;
