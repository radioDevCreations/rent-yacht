import "./MainLayout.scss";

import Footer from "../../components/Footer/Footer";
import Header from "@/components/Header/Header";
import Provider from "@/redux/Provider";

const MainLayout = ({ children }) => {
	return (
		<Provider>
			<Header />
			<main className="main-layout">{children}</main>
			<Footer />
		</Provider>
	);
};

export default MainLayout;
