import { Row, Col, Checkbox, Typography } from "antd";
import PropTypes from "prop-types";
import cameraIcon from "/images/camera.png";
import trafficIcon from "/images/traffic.png";
import stationIcon from "/images/station.png";
import poiIcon from "/images/poi.png";

const items = [
	{
		id: 1,
		key: "camera",
		icon: cameraIcon,
		title: "Camera",
	},
	{
		id: 2,
		key: "traffic",
		icon: trafficIcon,
		title: "Tình trạng giao thông",
	},
	{
		id: 3,
		key: "station",
		icon: stationIcon,
		title: "Trạm giao thông công cộng",
	},
	{
		id: 4,
		key: "poi",
		icon: poiIcon,
		title: "Địa điểm quan trọng",
	},
];

const Siderbar = ({ state, onItemClick }) => {
	return (
		<Row>
			{items.map((item) => (
				<Col
					span={24}
					key={item.key}
					onClick={() => onItemClick(item.key)}
					className="flex gap-2 px-4 py-3 hover:bg-slate-400 transition-colors relative hover:cursor-pointer">
					<img src={item.icon} alt=""/>
					<Typography className="pl-1 font-normal text-base select-none">
						{item.title}
					</Typography>
					<Checkbox
						className="absolute top-1/2 transform -translate-y-1/2 right-4"
						checked={state[item.key]}
					/>
				</Col>
			))}
		</Row>
	);
};

Siderbar.propTypes = {
	state: PropTypes.any.isRequired,
	onItemClick: PropTypes.any.isRequired,
};

export default Siderbar;
