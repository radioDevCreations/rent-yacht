import "./BoatsFilter.scss";
import { FaSailboat } from "react-icons/fa6";
import { IoMdBoat } from "react-icons/io";

const BoatsFilter = () => {
	return (
		<section className="filter">
			<div className="filter__section">
				<div className="filter__type-option">
					<span>ALL</span>
				</div>
				<div className="filter__type-option">
					<span className="filter__type-icon">
						<FaSailboat />
					</span>
				</div>
				<div className="filter__type-option">
					<span className="filter__type-icon">
						<IoMdBoat />
					</span>
				</div>
			</div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
		</section>
	);
};

export default BoatsFilter;
