"use client";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { openMenu, closeMenu } from "@/redux/slices/applicationSlice";
import HeaderNavigation from "./HeaderNavigation";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Header = () => {
	const dispatch = useDispatch();
	const applicationState = useSelector((state) => state.application);
	const toggleMenuOpen = () => {
		if (applicationState.isMenuOpen) dispatch(closeMenu());
		else dispatch(openMenu());
	};
	return (
		<header className="header">
			<div className="logo">
				<Link href="/" className="logo__link">
					<img src="/sail-boat.svg" alt="logo" className="logo__image" />
					<span className="logo__text">Boatify</span>
				</Link>
			</div>
			<div className="navigation-wrapper">
				<HeaderNavigation isMenuOpen={applicationState.isMenuOpen} />

				{applicationState.isMenuOpen ? (
					<button
						className="navigation-switch"
						onClick={toggleMenuOpen}
						disabled={!applicationState.isMenuOpen}
					>
						<IoMdCloseCircleOutline />
					</button>
				) : (
					<button
						className="navigation-switch"
						onClick={toggleMenuOpen}
						disabled={applicationState.isMenuOpen}
					>
						<HiMenu />
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
