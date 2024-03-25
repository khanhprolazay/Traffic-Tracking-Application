import { GoogleMap, Marker, StandaloneSearchBox, TrafficLayer, TransitLayer } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import cameras from "../mock/cameras.mock.json";
import { pushCamera } from "../app/slices/app.slice";
import PropTypes from 'prop-types';
import { useRef, useState } from "react";
import iconLocationSearch from "../assets/images/locationSearch.png";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";

// import { GOOGLE_MAPS_API_KEY, LIBRARIES } from '../config/index'
import { Button, Col, Row } from "antd";

const darkModeStyles = [
	{
		elementType: "geometry",
		stylers: [{ color: "#242f3e" }]
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

const AppGoogleMap = ({ showCamera = false, traffic, station, poi, showSearch = false }) => {
	const dispatch = useDispatch();
	const darkMode = useSelector((state) => state.app.darkMode);
	const searchBoxRef = useRef(null);
	const [positionSearch, setPositionSearch] = useState(center)
	const [zoom, setZoom] = useState(15)

	const defaultStyles = station == true && poi == true ? []
		: station == true && poi == false ? [...hideMarkerStyle]
			: station == false && poi == true ? [...hideStationStyle]
				: [...hideStationStyle, ...hideMarkerStyle]

	const onMarkerClick = (camera) => {
		dispatch(pushCamera(camera));
	};

	const handleSearchBoxLoad = (searchBox) => { searchBoxRef.current = searchBox }

	const handlePlacesChanged = () => {
		if (searchBoxRef.current) {
			const places = searchBoxRef.current.getPlaces();
			setPositionSearch({
				lat: places[0].geometry.location.lat(),
				lng: places[0].geometry.location.lng()
			})
			setZoom(17)
		}
	};

	const handleEnter = () => { handlePlacesChanged() }

	const toCoordinates = () => {
		const currentPosition = JSON.parse(localStorage.getItem('currentPosition'))
		setPositionSearch({
			lat: currentPosition.lat,
			lng: currentPosition.lng
		})
		setZoom(17)
	}


	return (
		<GoogleMap
			zoom={zoom}
			center={positionSearch}
			mapContainerClassName="w-full h-full border"
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
				cameras.map((camera) => (
					<Marker
						key={camera.id}
						position={camera.position}
						onClick={() => onMarkerClick(camera)}
						icon="http://giaothong.hochiminhcity.gov.vn/images/camera_green.png"
					/>
				))}

			{positionSearch != center &&
				<Marker
					position={{
						lat: positionSearch.lat,
						lng: positionSearch.lng
					}}
					icon={iconLocationSearch}
				/>
			}

			{showSearch &&
				<Row justify="center" style={{ margin: 0 }}>
					<Col style={{ padding: '0px' }} className="w-full">
						<StandaloneSearchBox
							onLoad={handleSearchBoxLoad}
							onPlacesChanged={handlePlacesChanged}
						>
							<input
								type="text"
								placeholder="Nhập địa điểm muốn tìm kiếm..."
								onKeyDown={handleEnter}
								style={{
									boxSizing: 'border-box',
									outline: 'none',
									textOverflow: 'ellipses',
									background: darkMode ? '#EEEEEE' : '#D3D3D3',
									color: 'black',
								}}
								className="bg-gray-300 p-[15px] text-sm font-n h-9 w-full border hover:border-blue-600"
							/>
						</StandaloneSearchBox>
						<SearchOutlined className="absolute top-0 right-3 h-9 rounded-none text-lg bg-none " />
						<Button
							onClick={toCoordinates}
							className="absolute right-[10px] top-[370px] rounded-none border-none "
							style={{ width: 40, height: 40, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', background: 'white' }}
							icon={<AimOutlined style={{ fontSize: 25 }} className="text-black hover:text-blue-600" />}
						/>
					</Col>
				</Row>
			}
		</GoogleMap>
	);
};

AppGoogleMap.propTypes = {
	showCamera: PropTypes.bool.isRequired,
	traffic: PropTypes.bool.isRequired,
	station: PropTypes.bool.isRequired,
	poi: PropTypes.bool.isRequired,
	showSearch: PropTypes.bool.isRequired,
}

export default AppGoogleMap;
