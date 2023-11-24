import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
	const mapContainerStyle = {
		width: "100vw",
		height: "100vh",
	};

	const center = {
		lat: 51.9189, // Default to Poland Francisco's latitude
		lng: 19.13438, // Default to San Francisco's longitude
	};

	return (
		<LoadScript
			googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
			libraries={["places"]}
		>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={10}
			>
				{/* You can add markers, polygons, and other components here */}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapComponent;
