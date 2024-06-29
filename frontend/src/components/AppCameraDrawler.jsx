import { Button, Descriptions, Divider, Drawer } from "antd";
import Camera from "./Camera";
import { CloseCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useCameraStore } from "../stores";
import { StreetStatusText } from "../constant";

const CameraItem = ({ id, name, index, total }) => {
	const { removeDrawlerCamera, cameras } = useCameraStore();
	const onItemClick = () => removeDrawlerCamera(id);
	const status = cameras[id]?.status;
	const type = cameras[id]?.type;

	return (
		<div className="relative">
			<Button
				size="large"
				onClick={onItemClick}
				className="absolute top-0 right-0 bg-transparent border-none focus:outline-none shadow-none"
				icon={<CloseCircleOutlined />}
			/>
			<Descriptions column={1} size="ant">
				<Descriptions.Item label="Tuyến đường">{name}</Descriptions.Item>
				<Descriptions.Item label="Tình trạng">{status && StreetStatusText[status]}</Descriptions.Item>
			</Descriptions>
			<Camera id={id} type={type}/>
			{index < total - 1 && <Divider />}
		</div>
	);
};

const AppCameraDrawler = () => {
	const { drawlerCameras, setOpenAppDrawer, openCamerasDrawler } = useCameraStore();
	const onClose = () => setOpenAppDrawer(false);

	return (
		<Drawer
			zIndex={10}
			onClose={onClose}
			title="Thông tin tuyến đường"
			open={openCamerasDrawler}>
			{drawlerCameras.map((camera, index) => (
				<CameraItem
					key={camera.id}
					index={index}
					total={drawlerCameras.length}
					{...camera}
				/>
			))}
		</Drawer>
	);
};

CameraItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
};

export default AppCameraDrawler;
