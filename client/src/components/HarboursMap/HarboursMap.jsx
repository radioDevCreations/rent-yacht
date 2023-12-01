"use client";
import "./HarboursMap.scss";
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect } from "react";

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
		<section className="map">
			<aside className="map__legend">Harbours</aside>
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY}
				libraries={["places"]}
			>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={center}
					zoom={8}
				>
					{/* You can add markers, polygons, and other components here */}
				</GoogleMap>
			</LoadScript>
		</section>
	);
};

export default MapComponent;
