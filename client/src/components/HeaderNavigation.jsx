import "./HeaderNavigation.scss";
import Link from "next/link";

const HeaderNavigation = () => {
	return (
		<nav>
			<ul className="header-navigation">
				<li className="header-navigation__item">
					<Link href="/harbours" className="header-navigation__item-link">
						Harbours
					</Link>
				</li>
				<li className="header-navigation__item">
					<Link href="/boats" className="header-navigation__item-link">
						Boats
					</Link>
				</li>
				<li className="header-navigation__item">
					<Link href="/last-minute" className="header-navigation__item-link">
						Last Minute
					</Link>
				</li>
				<li className="header-navigation__item">
					<Link href="/shop" className="header-navigation__item-link">
						Shop
					</Link>
				</li>
				<li className="header-navigation__item">
					<Link href="/contact" className="header-navigation__item-link">
						Contact
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default HeaderNavigation;
