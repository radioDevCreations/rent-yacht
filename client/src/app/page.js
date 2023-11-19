import style from "./page.module.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";

async function getData() {
	const res = await fetch("http://localhost:5000/test", {
		next: { revalidate: 10 },
	});
	return res.json();
}
const Home = async () => {
	const data = await getData();
	return (
		<MainLayout>
			<h1 className={style.main}>home page {data.test1}</h1>
		</MainLayout>
	);
};

export default Home;
