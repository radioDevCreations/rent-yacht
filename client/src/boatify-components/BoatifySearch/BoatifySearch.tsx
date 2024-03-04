import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import "./BoatifySearch.scss";

const BoatifySearch = () => {
	return (
		<>
			<div className="input search">
				<label className="search__icon-label" htmlFor="search-input"></label>
				<input
					type="text"
					id="search-input"
					className="search__input input__field"
					placeholder="Search..."
				/>
				<button type="submit" className="search__button">
					<span className="icon icon--search"></span>
					<BoatifyButton
						value="Search"
						type={ButtonType.button}
						classModifier="boatify-button--search"
					/>
				</button>
			</div>
		</>
	);
};

export default BoatifySearch;
