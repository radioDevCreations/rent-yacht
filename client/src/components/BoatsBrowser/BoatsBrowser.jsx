import BoatifySearch from "@/boatify-components/BoatifySearch/BoatifySearch";
import React, { FC } from "react";
import BoatItem from "../BoatItem/BoatItem";
import BoatsFilter from "../BoatsFilter/BoatsFilter";
import "./BoatsBrowser.scss";

const BoatsBrowser = () => {
	return (
		<div className="browser-container">
			<div className="browser">
				<aside className="aside">
					<BoatifySearch />
					<BoatsFilter />
				</aside>
				<section className="boats">
					<BoatItem />
					<BoatItem />
					<BoatItem />
				</section>
			</div>
		</div>
	);
};

export default BoatsBrowser;
