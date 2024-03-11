import "./BoatItem.scss";

const BoatItem = () => {
	return (
		<div className="boat-item">
			<div className="boat-item__picture"></div>
			<div className="boat-item__featured-details"></div>
			<div className="boat-item__button-section">
				<button className="boat-item__details-button">Details</button>
				<button className="boat-item__rent-button">Rent</button>
			</div>
		</div>
	);
};

export default BoatItem;
