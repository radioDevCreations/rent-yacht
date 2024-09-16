import style from "./page.module.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import PageSection from "@/pages/PageSection/PageSection";
import PageVariant from "@/pages/PageSection/PageVariant";
import Hero from "@/components/Hero/Hero";

const Home = async () => {
	return (
		<MainLayout>
			<PageSection variant={PageVariant.light}>
				<Hero />
			</PageSection>
			<PageSection variant={PageVariant.dark}>
				<h1 className={style.main}>home page</h1>
			</PageSection>
			<PageSection variant={PageVariant.light}>
				<h1 className={style.main}>home page</h1>
			</PageSection>
			<PageSection variant={PageVariant.dark}>
				<h1 className={style.main}>home page</h1>
			</PageSection>
		</MainLayout>
	);
};

export default Home;
