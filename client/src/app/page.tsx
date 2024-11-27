"use client"
import "./page.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import PageSection from "@/components/PageSection/PageSection";
import PageVariant from "@/components/PageSection/PageVariant";
import Hero from "@/components/Hero/Hero";
import Featured from "@/components/Featured/Featured";
import MapLink from "@/components/MapLink/MapLink";
import PocketContactForm from "@/components/PocketContactForm/PocketContactForm";
import { useEffect } from "react";

const fetchData = async () => {
	try {
	  const response = await fetch('https://localhost:5000/api/boat?searchPhrase=na&pageSize=5&pageNumber=1&sortBy=Name&sortDirection=DESC');
	  const data = await response.json();
	  console.log('Fetched data:', data);
	} catch (error) {
	  console.error('Error fetching data:', error);
	}
  };


const Home = () => {

	useEffect(() => {
		fetchData();
	  }, []); 

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
