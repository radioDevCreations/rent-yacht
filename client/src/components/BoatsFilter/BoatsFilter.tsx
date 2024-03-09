import "./BoatsFilter.scss";
import { FaSailboat } from "react-icons/fa6";
import { IoMdBoat } from "react-icons/io";
import BoatifyInput from "@/boatify-components/BoatifyInput/BoatifyInput";
import InputType from "@/utilities/InputType";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import {
	setPassengersFilter,
	setStartDateFilter,
	setEndDateFilter,
} from "@/redux/slices/filterSlice";
import BoatifyTag from "@/boatify-components/BoatifyTag/BoatifyTag";
import TagType from "@/utilities/TagType";

const BoatsFilter = () => {
	const dispatch = useDispatch();
	const filterState = useSelector((state: any) => state.filters);
	const handlePassengersNumberChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setPassengersFilter(+event?.target?.value));
	};
	const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setStartDateFilter(+event?.target?.value));
		console.log(filterState.startDate);
		console.log(filterState.endDate);
	};
	const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setEndDateFilter(+event?.target?.value));
		console.log(filterState.startDate);
		console.log(filterState.endDate);
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
			<div className="filter__section filter__section--vertical">
				<BoatifyInput
					label="Passengers"
					key="passengers"
					placeholder="2"
					type={InputType.number}
					onChange={handlePassengersNumberChange}
				/>
			</div>
			<div className="filter__section filter__section--vertical">
				<h3 className="filter__section-title">
					<span>Period of Rent</span>
				</h3>
				<span className="spacer"></span>
				<BoatifyInput
					label="Start Date"
					key="startdate"
					placeholder="2"
					type={InputType.date}
					onChange={handleStartDateChange}
				/>
				<BoatifyInput
					label="End Date"
					key="enddate"
					placeholder="2"
					type={InputType.date}
					onChange={handleEndDateChange}
				/>
				<BoatifyTag
					type={TagType.days}
					label={`${filterState.endDate - filterState.startDate}`}
				/>
			</div>
			<div className="filter__section"></div>
			<div className="filter__section"></div>
		</section>
	);
};

export default BoatsFilter;
