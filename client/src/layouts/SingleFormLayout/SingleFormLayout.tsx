import "../../styles/styles.scss";
import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";
import HeaderLogin from "../../components/HeaderSingleForm/HeaderSingleForm";
import FooterSingleForm from "../../components/FooterSingleForm/FooterSingleForm";
import { ReactNode } from "react";
import BoatifyLinkProps from "@/utilities/BoatifyLinkProps";

interface SingleFormLayoutProps {
	children: ReactNode;
	problem?: string;
	link?: BoatifyLinkProps;
}

const SingleFormLayout = ({
	children,
	problem,
	link,
}: SingleFormLayoutProps) => {
	return (
		<Provider>
			<div className="single-form-layout">
				<HeaderLogin />
				<main className="single-form-layout">{children}</main>
				<FooterSingleForm problem={problem} link={link} />
			</div>
		</Provider>
	);
};

export default SingleFormLayout;
