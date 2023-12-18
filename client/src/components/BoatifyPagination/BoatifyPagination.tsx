import "./BoatifyPagination.scss";
import Image from "next/image";

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
						src="/back-arrow.svg"
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
						src="/next-arrow.svg"
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
