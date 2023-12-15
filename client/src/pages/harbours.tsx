import "./harbours.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import HarboursMap from "@/components/HarboursMap/HarboursMap";
import DataLoader from "@/dataLoaders/DataLoader";

export const getStaticProps = async () => {
	const data = await DataLoader.getAllHarbours();
	return {
		props: { harbours: data },
	};
};

const HarboursPage = ({ harbours }) => {
	return (
		<MainLayout>
			<HarboursMap data={harbours} />
		</MainLayout>
	);
};

export default HarboursPage;
