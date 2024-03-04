const BoatifySearch = () => {
	return (
		<>
			<div className="search__field">
				<label
					className="search__icon-label"
					htmlFor="header-search-input"
				></label>
				<input
					type="text"
					id="header-search-input"
					name="src"
					className="search__input js-search-input js-header-search-input tt-input"
					placeholder="What are you looking for?"
					dir="auto"
					aria-owns="header-search-input_listbox"
					role="combobox"
					aria-autocomplete="list"
					aria-expanded="false"
					data-last-active-input=""
				/>
				<button
					type="submit"
					className="search__button button button--primary js-search-action"
				>
					<span className="icon icon--search"></span>
					<span className="search__button-text">Search</span>
				</button>
			</div>
		</>
	);
};

export default BoatifySearch;
