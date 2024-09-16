import "./Hero.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";

const Hero = () => {
	return (
		<article className="hero">
			<Image
				src={IMAGE.svg.ship}
				alt="ship"
				className="hero__image"
				width={448}
				height={48}
			/>
			<div className="hero__captions">
				<h1 className="hero__title">Żegluj z nami</h1>
				<p className="hero__text1">Znajdź wymarzoną łódź na swój rejs</p>
			</div>
		</article>
	);
};

export default Hero;
