import "./BoatsFilter.scss";
import { FaSailboat } from "react-icons/fa6";
import { IoMdBoat } from "react-icons/io";
import BoatifyInput from "@/boatify-components/BoatifyInput/BoatifyInput";
import InputType from "@/utilities/InputType";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { setPassengersFilter } from "@/redux/slices/filterSlice";

const BoatsFilter = () => {
	const dispatch = useDispatch();
	const boatsState = useSelector((state: any) => state.filters);
	const handlePassengersNumberChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setPassengersFilter(+event?.target?.value));
	};

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
			<div className="filter__section">
				<BoatifyInput
					label="Passengers"
					key="passengers"
					placeholder="2"
					type={InputType.number}
					onChange={handlePassengersNumberChange}
				/>
			</div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
		</section>
	);
};

export default BoatsFilter;
