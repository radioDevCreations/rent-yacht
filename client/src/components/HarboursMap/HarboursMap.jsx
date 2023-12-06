import "./HarboursMap.scss";
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import HarboursMapAside from "../HarboursMapAside/HarboursMapAside";

const MapComponent = ({ data }) => {
	const mapContainerStyle = {
		width: "100vw",
		height: "100vh",
	};

	const center = {
		lat: 51.9189, // Default to Poland Francisco's latitude
		lng: 19.13438, // Default to San Francisco's longitude
	};

	return (
		<section className="map">
			<HarboursMapAside data={data} />
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
				libraries={["places"]}
			>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={center}
					zoom={8}
				></GoogleMap>
			</LoadScript>
		</section>
	);
};

export default MapComponent;
