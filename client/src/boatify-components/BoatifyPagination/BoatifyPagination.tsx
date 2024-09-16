import "./BoatifyPagination.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

interface BoatifyPaginationProps {
	numberOfPages: number;
	currentPage: number;
	prevPage: () => void;
	nextPage: () => void;
}

const BoatifyPagination = ({
	numberOfPages,
	currentPage,
	prevPage,
	nextPage,
}: BoatifyPaginationProps) => {
	const prevButtonActive = currentPage > 1;
	const nextButtonActive = currentPage < numberOfPages;
	return (
		<div className="pagination">
			<div className="pagination__button-wrapper">
				<button
					className="pagination__button"
					type="button"
					disabled={!prevButtonActive}
					onClick={prevPage}
				>
					<Image
						className="button-image"
						src={IMAGE.svg.backArrow}
						alt="Previous Page"
						width={20}
						height={20}
					/>
				</button>
			</div>
			<div className="pagination__spacing"></div>
			<div className="pagination__numeration">
				<span className="pagination__number">{currentPage}</span>
				<span className="pagination__slash"> / </span>
				<span className="pagination__number">{numberOfPages}</span>
			</div>
			<div className="pagination__spacing"></div>
			<div className="pagination__button-wrapper">
				<button
					className="pagination__button"
					type="button"
					disabled={!nextButtonActive}
					onClick={nextPage}
				>
					<Image
						className="button-image"
						src={IMAGE.svg.nextArrow}
						alt="Next Page"
						width={20}
						height={20}
					/>
				</button>
			</div>
		</div>
	);
};

export default BoatifyPagination;
