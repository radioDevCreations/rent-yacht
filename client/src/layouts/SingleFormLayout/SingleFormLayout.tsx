import "../../styles/styles.scss";
import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";
import HeaderLogin from "../../components/HeaderSingleForm/HeaderSingleForm";
import FooterSingleForm from "../../components/FooterSingleForm/FooterSingleForm";
import { ReactNode } from "react";

interface SingleFormLayoutProps {
	children: ReactNode;
	problem?: string;
}

const SingleFormLayout = ({ children, problem }: SingleFormLayoutProps) => {
	return (
		<Provider>
			<div className="single-form-layout">
				<HeaderLogin />
				<main className="single-form-layout">{children}</main>
				<FooterSingleForm problem={problem} />
			</div>
		</Provider>
	);
};

export default SingleFormLayout;
