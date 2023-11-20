import "./SingleFormLayout.scss";
import Provider from "@/redux/Provider";

const SingleFormLayout = ({ children }) => {
	return (
		<Provider>
			<div className="single-form-layout">{children}</div>
		</Provider>
	);
};

export default SingleFormLayout;
