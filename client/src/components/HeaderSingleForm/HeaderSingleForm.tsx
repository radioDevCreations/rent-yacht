"use client";
import "./HeaderSingleForm.scss";
import Link from "next/link";
import Image from "next/image";
import IMAGE from "../../../public/links";

const HeaderSingleForm = () => {
	return (
		<header className="header">
			<div className="logo">
				<Link href="/" className="logo__link">
					<Image
						src={IMAGE.svg.sailBoat}
						alt="logo"
						className="logo__image"
						width={48}
						height={48}
					/>
					<span className="logo__text">Boatify</span>
				</Link>
			</div>
		</header>
	);
};

export default HeaderSingleForm;
