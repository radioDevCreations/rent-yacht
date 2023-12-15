"use client";
import "./RegisterForm.scss";
import Image from "next/image";
import BoatifyPagination from "../BoatifyPagination/BoatifyPagination";
import { useState } from "react";

const RegisterForm = () => {
	const [page, setPage] = useState(1);
	const handlePrevPage = () => {
		setPage(page - 1);
	};
	const handleNextPage = () => {
		setPage(page + 1);
	};
	return (
		<form className="register">
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
				<input className="input__field" type="email" placeholder="E-mail" />
			</div>
			<div className="input">
				<span className="input__label">Password</span>
				<input className="input__field" type="text" placeholder="Password" />
			</div>
			<BoatifyPagination
				currentPage={page}
				numberOfPages={5}
				prevPage={handlePrevPage}
				nextPage={handleNextPage}
			/>
		</form>
	);
};

export default RegisterForm;
