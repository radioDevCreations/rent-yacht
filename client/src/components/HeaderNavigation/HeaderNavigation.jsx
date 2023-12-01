import "./HeaderNavigation.scss";
import Link from "next/link";

const NAVIGATION_ITEMS = [
	{ name: "Harbours", href: "/harbours", customClassName: "" },
	{ name: "Boats", href: "/boats", customClassName: "transition-delay1" },
	{
		name: "Last Minute",
		href: "/last-minute",
		customClassName: "transition-delay2",
	},
	{ name: "Shop", href: "/shop", customClassName: "transition-delay3" },
	{ name: "Contact", href: "/contact", customClassName: "transition-delay4" },
];

const HeaderNavigation = ({ isMenuOpen }) => {
	const itemClass = isMenuOpen
		? "header-navigation__item header-navigation__item--in"
		: "header-navigation__item header-navigation__item--out";
	const linkClass = isMenuOpen
		? "header-navigation__item-link"
		: "header-navigation__item-link header-navigation__item-link--inactive";
	return (
		<nav>
			<ul className="header-navigation">
				{NAVIGATION_ITEMS.map((item) => {
					return (
						<li
							key={item.name}
							className={`${item.customClassName} ${itemClass}`}
						>
							<Link href={item.href} className={linkClass}>
								{item.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default HeaderNavigation;
