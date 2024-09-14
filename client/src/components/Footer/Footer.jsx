import "./Footer.scss";

const FOOTER_ITEMS = {
	column1: [
		{
			name: "Footer Item 1",
			type: "image",
			src: "/sail-boat.svg",
			alt: "Sailboat Logo",
		},
		{
			name: "Footer Item 2",
			type: "image",
			src: "/sail-boat.svg",
			alt: "Sailboat Logo",
		},
	],
	column2: [
		{ name: "Harbours", type: "link", href: "" },
		{ name: "Boats", type: "link", href: "" },
		{ name: "Last Minute", type: "link", href: "" },
		{ name: "Shop", type: "link", href: "" },
		{ name: "Contact", type: "link", href: "" },
	],
	column3: [
		{ name: "My Account", type: "link", href: "" },
		{ name: "My Rentals", type: "link", href: "" },
		{ name: "Favourites", type: "link", href: "" },
		{ name: "Footer Item 14", type: "link", href: "" },
		{ name: "Footer Item 15", type: "link", href: "" },
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
