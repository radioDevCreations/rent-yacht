import "./harbours.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HarboursMap from "@/components/HarboursMap/HarboursMap";

const HarboursPage = () => {
	return (
		<MainLayout>
			<HarboursMap />
		</MainLayout>
	);
};

export default HarboursPage;
