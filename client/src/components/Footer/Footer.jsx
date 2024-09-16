import LinkType from "@/utilities/LinkType";
import "./Footer.scss";
import IMAGE from "../../../public/links";

const FOOTER_ITEMS = {
	column1: [
		{
			name: "Footer Item 1",
			type: LinkType.image,
			src: IMAGE.svg.sailBoat,
			alt: "Sailboat Logo",
		},
		{
			name: "Footer Item 2",
			type: LinkType.image,
			src: IMAGE.svg.sailBoat,
			alt: "Sailboat Logo",
		},
	],
	column2: [
		{ name: "Harbours", type: LinkType.link, href: "" },
		{ name: "Boats", type: LinkType.link, href: "" },
		{ name: "Last Minute", type: LinkType.link, href: "" },
		{ name: "Shop", type: LinkType.link, href: "" },
		{ name: "Contact", type: LinkType.link, href: "" },
	],
	column3: [
		{ name: "My Account", type: LinkType.link, href: "" },
		{ name: "My Rentals", type: LinkType.link, href: "" },
		{ name: "Favourites", type: LinkType.link, href: "" },
		{ name: "Compare Boats", type: LinkType.link, href: "" },
		{ name: "My Documents", type: LinkType.link, href: "" },
	],
};

const Footer = () => {
	const footerItemClass = "footer-links__item";
	const footerImageClass = "footer-images__item";
	return (
		<footer className="footer">
			<div className="footer-images">
				<ul className="footer-images__row">
					{FOOTER_ITEMS.column1.map((item) => (
						<img
							key={item.name}
							className={footerImageClass}
							src={item.src}
							alt={item.alts}
						/>
					))}
				</ul>
			</div>
			<div className="footer-links">
				<ul className="footer-links__col footer-links__col2">
					{FOOTER_ITEMS.column2.map((item) => (
						<li key={item.name} className={footerItemClass}>
							{item.name}
						</li>
					))}
				</ul>
				<ul className="footer-links__col footer-links__col3">
					{FOOTER_ITEMS.column3.map((item) => (
						<li key={item.name} className={footerItemClass}>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
