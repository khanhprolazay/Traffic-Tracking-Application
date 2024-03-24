import { LoadScript } from "@react-google-maps/api";
// import React from "react";
import { GOOGLE_MAPS_API_KEY, LIBRARIES } from "../config";
import PropTypes from 'prop-types';

const GoogleMapProvider = ({ children }) => {
	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>{children}</LoadScript>
	);
};

GoogleMapProvider.propTypes = {
	children: PropTypes.any.isRequired,
}

export default GoogleMapProvider;
