import { GoogleMap, Marker, TrafficLayer } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import cameras from "../mock/cameras.mock.json";
import { pushCamera } from "../app/slices/app.slice";
import PropTypes from 'prop-types';

const darkModeStyles = [
	{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
	{
		elementType: "labels.text.stroke",
		stylers: [{ color: "#242f3e" }],
	},
	{
		elementType: "labels.text.fill",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#263c3f" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#6b9a76" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#38414e" }],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [{ color: "#212a37" }],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{ color: "#1f2835" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#f3d19c" }],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [{ color: "#2f3948" }],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#17263c" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#515c6d" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [{ color: "#17263c" }],
	},
];

const hideMarkerStyle = [
	{
		featureType: "poi",
		elementType: "labels",
		stylers: [{ visibility: "off" }],
	},
];

const hideStationStyle = [
	{
		featureType: "transit.station",
		elementType: "labels",
		stylers: [{ visibility: "off" }],
	},
];

const defaultStyles = [...hideMarkerStyle, ...hideStationStyle];

const center = {
	lat: 10.772641893294024,
	lng: 106.69798218614284,
};

const AppGoogleMap = ({ showCamera = false }) => {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.app.darkMode);

	const onMarkerClick = (camera) => {
		dispatch(pushCamera(camera));
	};

	return (
		<GoogleMap
			zoom={15}
			center={center}
			mapContainerClassName="w-full h-full"
			options={{
				styles: darkMode
					? [...darkModeStyles, ...defaultStyles]
					: defaultStyles,
				mapTypeControl: false
			}}>
			<TrafficLayer />
			{showCamera &&
				cameras.map((camera) => (
					<Marker
						key={camera.id}
						position={camera.position}
						onClick={() => onMarkerClick(camera)}
						icon="http://giaothong.hochiminhcity.gov.vn/images/camera_green.png"
					/>
				))}
		</GoogleMap>
	);
};

AppGoogleMap.propTypes = {
	showCamera: PropTypes.bool.isRequired,
}

export default AppGoogleMap;
