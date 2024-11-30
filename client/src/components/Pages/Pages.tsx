import "./Pages.scss";
import Image from "next/image";
import IMAGE from "../../../public/links";
import Page1 from "../Page1/Page1";
import Page2 from "../Page2/Page2";
import Page3 from "../Page3/Page3";
import Page4 from "../Page4/Page4";
import PageFinalize from "../PageFinalize/PageFinalize";
import { ReactNode } from "react";

export interface Steps {
	step1?: ReactNode;
	step2?: ReactNode;
	step3?: ReactNode;
	step4?: ReactNode;
	stepFinal?: ReactNode;
}

interface PagesProps {
	currentPosition: number;
	steps: Steps;
}

const Pages = ({ currentPosition, steps }: PagesProps) => {
	return (
		<article className="rp-container">
			{steps.step1 && <Page1 isActive={currentPosition === 1} >{steps.step1}</Page1>}
			{steps.step2 && <Page2 isActive={currentPosition === 2} >{steps.step2}</Page2>}
			{steps.step3 && <Page3 isActive={currentPosition === 3} >{steps.step3}</Page3>}
			{steps.step4 && <Page4 isActive={currentPosition === 4} >{steps.step4}</Page4>}
			{steps.stepFinal && <PageFinalize isActive={currentPosition === 5} >{steps.stepFinal}</PageFinalize>}
		</article>
	);
};

export default Pages;
