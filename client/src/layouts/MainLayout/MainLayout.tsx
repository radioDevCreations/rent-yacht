import "../../styles/globals.css";
import "../../styles/styles.scss";
import "./MainLayout.scss";

import Footer from "../../components/Footer/Footer";
import Header from "@/components/Header/Header";
import Provider from "@/redux/Provider";
import Children from "@/utilities/Children";

const MainLayout = ({ children }: Children) => {
	return (
		<Provider>
			<Header />
			<main className="main-layout">{children}</main>
			<Footer />
		</Provider>
	);
};

export default MainLayout;
