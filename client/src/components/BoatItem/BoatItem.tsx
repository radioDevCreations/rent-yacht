import BoatifyButton from "@/boatify-components/BoatifyButton/BoatifyButton";
import ButtonType from "@/utilities/ButtonType";
import "./BoatItem.scss";

const BoatItem = () => {
	return (
		<div className="boat-item">
			<div className="boat-item__picture"></div>
			<div className="boat-item__featured-details"></div>
			<div className="boat-item__button-section">
				<BoatifyButton
					value="Details"
					type={ButtonType.button}
					classModifier="boatify-button--boat-item"
				/>
				<BoatifyButton
					value="Rent"
					type={ButtonType.button}
					classModifier="boatify-button--boat-item"
				/>
			</div>
		</div>
	);
};

export default BoatItem;
