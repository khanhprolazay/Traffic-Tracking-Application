import {
	GoogleMap,
	Marker,
	StandaloneSearchBox,
	TrafficLayer,
	TransitLayer,
} from "@react-google-maps/api";
// import cameras from "../mock/cameras.mock.json";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import iconLocationSearch from "/images/locationSearch.png";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useCameraStore, useThemeStore } from "../stores";

const darkModeStyles = [
	{
		elementType: "geometry",
		stylers: [{ color: "#242f3e" }],
	},
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

const center = {
	lat: 10.772641893294024,
	lng: 106.69798218614284,
};

const AppGoogleMap = ({
	showCamera = true,
	traffic = true,
	station = false,
	poi = false,
	showSearch = false,
	dataCamera
}) => {
	const { darkMode } = useThemeStore();
	const { pushDrawlerCamera } = useCameraStore();
	const searchBoxRef = useRef(null);
	const [positionSearch, setPositionSearch] = useState(center);
	const [zoom, setZoom] = useState(15);

	const defaultStyles =
		station == true && poi == true
			? []
			: station == true && poi == false
			? [...hideMarkerStyle]
			: station == false && poi == true
			? [...hideStationStyle]
			: [...hideStationStyle, ...hideMarkerStyle];

	const onMarkerClick = (camera) => pushDrawlerCamera(camera);
	const handleSearchBoxLoad = (searchBox) => {
		searchBoxRef.current = searchBox;
	};

	const handlePlacesChanged = () => {
		if (searchBoxRef.current) {
			const places = searchBoxRef.current.getPlaces();
			if (places.length !== 0) {
				setPositionSearch({
					lat: places[0].geometry.location.lat(),
					lng: places[0].geometry.location.lng(),
				});
				setZoom(17);
			}
		}
	};

	const handleEnter = () => {
		handlePlacesChanged();
	};

	const toCoordinates = () => {
		const currentPosition = JSON.parse(localStorage.getItem("currentPosition"));
		setPositionSearch(currentPosition);
		setZoom(17);
	};

	return (
		<GoogleMap
			zoom={zoom}
			center={positionSearch}
			mapContainerClassName="w-full h-full"
			options={{
				styles: darkMode
					? [...darkModeStyles, ...defaultStyles]
					: defaultStyles,
				mapTypeControl: false,
				fullscreenControl: false,
			}}>
			{station && <TransitLayer />}
			{traffic && <TrafficLayer />}
			{showCamera &&
				dataCamera.map((camera) => (
					<Marker
						key={camera.id}
						position={camera.position}
						onClick={() => onMarkerClick(camera)}
						icon="http://giaothong.hochiminhcity.gov.vn/images/camera_green.png"
					/>
				))}

			{positionSearch != center && (
				<Marker position={positionSearch} icon={iconLocationSearch} />
			)}

			{showSearch && (
				<Row justify="center" className="m-0">
					<Col className="w-full p-0">
						<StandaloneSearchBox
							onLoad={handleSearchBoxLoad}
							onPlacesChanged={handlePlacesChanged}>
							<Input
								type="text"
								placeholder="Nhập địa điểm muốn tìm kiếm..."
								onKeyDown={handleEnter}
								variant="outlined"
								className="rounded-none text-sm h-9 w-full "
							/>
						</StandaloneSearchBox>
						<SearchOutlined className="absolute top-0 right-3 h-9 rounded-none text-lg bg-none " />
						<Button
							onClick={toCoordinates}
							className="absolute right-[10px] top-[370px] rounded-none border-none bg-white !shadow-sm !w-10 !h-10"
							icon={
								<AimOutlined className="!text-2xl text-black hover:text-blue-600" />
							}
						/>
					</Col>
				</Row>
			)}
		</GoogleMap>
	);
};

AppGoogleMap.propTypes = {
	showCamera: PropTypes.bool.isRequired,
	traffic: PropTypes.bool.isRequired,
	station: PropTypes.bool.isRequired,
	poi: PropTypes.bool.isRequired,
	showSearch: PropTypes.bool.isRequired,
};

export default AppGoogleMap;
