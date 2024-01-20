import "./BoatifyInputsCarousel.scss";
import { ReactNode } from "react";

interface BoatifyInputsCarouselProps {
	currentPage: number;
	nodesPerPage: number;
	nodes: Array<ReactNode>;
}

const BoatifyInputsCarousel = ({
	currentPage,
	nodesPerPage,
	nodes,
}: BoatifyInputsCarouselProps) => {
	return (
		<div className="carousel">
			{nodes.map((item, index) => {
				if (
					index >= nodesPerPage * currentPage - nodesPerPage &&
					index < nodesPerPage * currentPage
				)
					return item;
			})}
		</div>
	);
};

export default BoatifyInputsCarousel;
