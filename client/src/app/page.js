import style from "./page.module.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";

const Home = async () => {
	return (
		<MainLayout>
			<h1 className={style.main}>home page</h1>
		</MainLayout>
	);
};

export default Home;
