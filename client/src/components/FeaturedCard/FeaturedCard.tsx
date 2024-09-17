import "./FeaturedCard.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import FeaturedCardsProps from "./FeaturedCardsProps";

const FeaturedCard = ({ name, icon, href }: FeaturedCardsProps) => {
	return (
		<a className="featured-card__link" href={href}>
			<div className="featured-card">
				<Image
					src={icon.src}
					alt={icon.alt}
					className="featured-card__image"
					height={64}
					width={64}
				/>
				<p className="featured-card__title">{name}</p>
			</div>
		</a>
	);
};

export default FeaturedCard;
