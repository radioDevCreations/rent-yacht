import "./RPContainer.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import RP1Page from "../RP1Page/RP1Page";
import RP2Page from "../RP2Page/RP2Page";
import RP3Page from "../RP3Page/RP3Page";
import RP4Page from "../RP4Page/RP4Page";
import RPFinalize from "../RPFinalize/RPFinalize";

interface RPContainerProps {
	currentPosition: number;
}

const RPContainer = ({ currentPosition }: RPContainerProps) => {
	return (
		<article className="rp-container">
			<RP1Page isActive={currentPosition === 1} />
			<RP2Page isActive={currentPosition === 2} />
			<RP3Page isActive={currentPosition === 3} />
			<RP4Page isActive={currentPosition === 4} />
			<RPFinalize isActive={currentPosition === 5} />
		</article>
	);
};

export default RPContainer;
