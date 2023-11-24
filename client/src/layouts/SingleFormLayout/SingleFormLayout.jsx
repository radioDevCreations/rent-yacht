import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";

const SingleFormLayout = ({ children }) => {
	return (
		<Provider>
			<main className="single-form-layout">{children}</main>
		</Provider>
	);
};

export default SingleFormLayout;
