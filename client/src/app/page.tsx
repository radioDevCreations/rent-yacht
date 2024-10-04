import "./page.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import PageSection from "@/components/PageSection/PageSection";
import PageVariant from "@/components/PageSection/PageVariant";
import Hero from "@/components/Hero/Hero";
import Featured from "@/components/Featured/Featured";
import MapLink from "@/components/MapLink/MapLink";
import PocketContactForm from "@/components/PocketContactForm/PocketContactForm";

const Home = async () => {
	return (
		<MainLayout>
			<PageSection variant={PageVariant.light}>
				<Hero />
			</PageSection>
			<PageSection variant={PageVariant.dark}>
				<Featured />
			</PageSection>
			<PageSection variant={PageVariant.light}>
				<MapLink />
			</PageSection>
			<PageSection variant={PageVariant.dark}>
				<PocketContactForm />
			</PageSection>
		</MainLayout>
	);
};

export default Home;
