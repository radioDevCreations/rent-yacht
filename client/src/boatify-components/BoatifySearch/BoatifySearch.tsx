import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import "./BoatifySearch.scss";

const BoatifySearch = () => {
	return (
		<>
			<div className="input search">
				<div className="search__label">
					<label className="search__icon-label" htmlFor="search-input"></label>
					<input
						type="text"
						id="search-input"
						className="search__input input__field"
						placeholder="Search..."
					/>
				</div>
				<div className="search__button">
					<BoatifyButton
						value="Search"
						type={ButtonType.button}
						classModifier="boatify-button--search"
					/>
				</div>
			</div>
		</>
	);
};

export default BoatifySearch;
