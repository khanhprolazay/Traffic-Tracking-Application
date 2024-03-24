import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../config";
import PropTypes from 'prop-types';

const GoogleMapProvider = ({ children }) => {
	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>{children}</LoadScript>
	);
};

GoogleMapProvider.propTypes = {
	children: PropTypes.any.isRequired,
}

export default GoogleMapProvider;
