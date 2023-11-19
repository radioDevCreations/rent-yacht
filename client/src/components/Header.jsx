"use client";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { openMenu, closeMenu } from "@/redux/slices/applicationSlice";
import HeaderNavigation from "./HeaderNavigation";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";

const Header = () => {
	const applicationState = useSelector((state) => state.application);

	return (
		<header className="header">
			<div className="logo">
				<Link href="/" className="logo__link">
					<img src="/sail-boat.svg" alt="logo" className="logo__image" />
					<span className="logo__text">Boatify</span>
				</Link>
			</div>
			<div className="navigation-wrapper">
				{isMenuOpen && <HeaderNavigation />}
				<button className="navigation-switch" onClick={toggleMenuOpen}>
					<HiMenu />
				</button>
			</div>
		</header>
	);
};

export default Header;
