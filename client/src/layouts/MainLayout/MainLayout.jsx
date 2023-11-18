import "./MainLayout.scss";

import Footer from "../../components/Footer";

const MainLayout = ({ children }) => {
	return (
		<>
			<div className="main-layout">{children}</div>
			<Footer />
		</>
	);
};

export default MainLayout;
