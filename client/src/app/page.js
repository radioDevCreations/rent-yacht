import styles from "./page.module.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";

const Home = () => {
	return (
		<MainLayout>
			<h1 className={styles.main}>home page</h1>
		</MainLayout>
	);
};

export default Home;
