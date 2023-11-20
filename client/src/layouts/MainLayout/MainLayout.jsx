import "./MainLayout.scss";

import Footer from "../../components/Footer";
import Header from "@/components/Header";
import Provider from "@/redux/Provider";

const MainLayout = ({ children }) => {
	return (
		<Provider>
			<Header />
			<div className="main-layout">{children}</div>
			<Footer />
		</Provider>
	);
};

export default MainLayout;
