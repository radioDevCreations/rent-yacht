import "./HeaderNavigation.scss";
import Link from "next/link";

const HeaderNavigation = ({ isMenuOpen }) => {
	const itemClass = isMenuOpen
		? "header-navigation__item header-navigation__item--show"
		: "header-navigation__item";
	return (
		<nav>
			<ul className="header-navigation">
				<li className={`animation-delay1 ${itemClass}`}>
					<Link href="/harbours" className="header-navigation__item-link">
						Harbours
					</Link>
				</li>
				<li className={`animation-delay2 ${itemClass}`}>
					<Link href="/boats" className="header-navigation__item-link">
						Boats
					</Link>
				</li>
				<li className={`animation-delay3 ${itemClass}`}>
					<Link href="/last-minute" className="header-navigation__item-link">
						Last Minute
					</Link>
				</li>
				<li className={`animation-delay4 ${itemClass}`}>
					<Link href="/shop" className="header-navigation__item-link">
						Shop
					</Link>
				</li>
				<li className={`animation-delay5 ${itemClass}`}>
					<Link href="/contact" className="header-navigation__item-link">
						Contact
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default HeaderNavigation;
