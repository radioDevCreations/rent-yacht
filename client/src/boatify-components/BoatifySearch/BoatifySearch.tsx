import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import "./BoatifySearch.scss";

const BoatifySearch = () => {
	return (
		<div className="search">
			<div className="search__input">
				<label className="search__input-label" htmlFor="search"></label>
				<input
					type="text"
					id="search"
					className="search__input-field input__field"
					placeholder="Search..."
				/>
			</div>
			<div className="search__button">
				<span className="icon icon--search"></span>
				<BoatifyButton
					value="Search"
					type={ButtonType.button}
					classModifier="boatify-button--search"
				/>
			</div>
		</div>
	);
};

export default BoatifySearch;
