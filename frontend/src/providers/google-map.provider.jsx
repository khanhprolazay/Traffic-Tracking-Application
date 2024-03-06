import { LoadScript } from "@react-google-maps/api";
import React from "react";
import { GOOGLE_MAPS_API_KEY } from "../config";

const GoogleMapProvider = ({ children }) => {
	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>{children}</LoadScript>
	);
};

export default GoogleMapProvider;
