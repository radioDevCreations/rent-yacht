import "./MainLayout.scss";

import Footer from "../../components/Footer";
import Header from "@/components/Header";

const MainLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="main-layout">{children}</div>
			<Footer />
		</>
	);
};

export default MainLayout;
