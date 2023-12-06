import "./HarboursMapAside.scss";
import label from "./label";

const HarboursMapAside = ({ data }) => {
	return (
		<aside className="aside">
			<section className="aside__section legend">
				<h3 className="legend__title">{label.LEGEND_TITLE}</h3>
				<h4 className="legend__harbours">{label.HARBOURS}</h4>
			</section>
			<section className="aside__section harbours-list">
				<h3 className="harbours-list__title">{label.HARBOURS_LIST_TITLE}</h3>
				<ul className="harbours-list__items-container">
					{data?.harbours.map((item) => {
						return (
							<li key={item.name} className="harbours-list__item">
								{item.name} - {item.localization}
							</li>
						);
					})}
				</ul>
			</section>
		</aside>
	);
};

export default HarboursMapAside;
