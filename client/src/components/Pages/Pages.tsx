import "./Pages.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import Page1 from "../Page1/Page1";
import Page2 from "../Page2/Page2";
import Page3 from "../Page3/Page3";
import Page4 from "../Page4/RP4Page";
import PageFinalize from "../PageFinal/RPFinalize";

interface PagesProps {
	currentPosition: number;
}

const Pages = ({ currentPosition }: PagesProps) => {
	return (
		<article className="rp-container">
			<Page1 isActive={currentPosition === 1} />
			<Page2 isActive={currentPosition === 2} />
			<Page3 isActive={currentPosition === 3} />
			<Page4 isActive={currentPosition === 4} />
			<PageFinalize isActive={currentPosition === 5} />
		</article>
	);
};

export default Pages;
