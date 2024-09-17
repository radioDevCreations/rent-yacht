import "./Featured.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import FeaturedCard from "../FeaturedCard/FeaturedCard";
import FeaturedCardsProps from "../FeaturedCard/FeaturedCardsProps";

const FEATURED_CARDS: FeaturedCardsProps[] = [
	{
		name: "Login",
		icon: {
			alt: "Login",
			src: IMAGE.svg.login,
		},
		href: "/login",
	},
	{
		name: "Register",
		icon: {
			alt: "Register",
			src: IMAGE.svg.register,
		},
		href: "/register",
	},
	{
		name: "Browse",
		icon: {
			alt: "Browse",
			src: IMAGE.svg.browse,
		},
		href: "/boats",
	},
];

const Featured = () => {
	return (
		<article className="featured">
			{FEATURED_CARDS.map((featuredItem: FeaturedCardsProps) => (
				<FeaturedCard
					key={featuredItem.name}
					name={featuredItem.name}
					icon={featuredItem.icon}
					href={featuredItem.href}
				/>
			))}
		</article>
	);
};

export default Featured;
