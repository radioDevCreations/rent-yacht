import "../../styles/globals.css";
import "../../styles/styles.scss";
import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";
import HeaderLogin from "../../components/HeaderSingleForm/HeaderSingleForm";
import FooterSingleForm from "../../components/FooterSingleForm/FooterSingleForm";
import BoatifyLinkProps from "@/utilities/BoatifyLinkProps";
import Children from "@/utilities/Children";

interface SingleFormLayoutProps extends Children {
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
