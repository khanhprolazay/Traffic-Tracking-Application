import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, LIBRARIES } from "../config";

export const GoogleMapProvider = ({ children }) => {
	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>
			{children}
		</LoadScript>
	);
};