import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";
import HeaderLogin from "../../components/HeaderSingleForm/HeaderSingleForm";
import FooterLogin from "../../components/FooterSingleForm/FooterSingleForm";

const SingleFormLayout = ({ children }) => {
	return (
		<Provider>
			<HeaderLogin />
			<main className="single-form-layout">{children}</main>
			<FooterLogin />
		</Provider>
	);
};

export default SingleFormLayout;
