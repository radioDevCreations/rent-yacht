interface BoatifyPagination {
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
}: BoatifyPagination) => {
	return (
		<div className="pagination">
			<button className="pagination__button" onClick={prevPage}>
				prev
			</button>
			<div className="pagination__numeration">
				<span className="pagination__current-number">{currentPage}</span>
				<span className="pagination__slash"> / </span>
				<span className="pagination__number-of-pages">{numberOfPages}</span>
			</div>
			<button className="pagination__button" onClick={nextPage}>
				next
			</button>
		</div>
	);
};

export default BoatifyPagination;
