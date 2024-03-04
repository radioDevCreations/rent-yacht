import "./boats.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import BoatsBrowser from "@/components/BoatsBrowser/BoatsBrowser";

const BoatsPage = () => {
	return (
		<MainLayout>
			<BoatsBrowser />
		</MainLayout>
	);
};

export default BoatsPage;
