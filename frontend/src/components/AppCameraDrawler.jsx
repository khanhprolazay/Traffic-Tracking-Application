import { Button, Descriptions, Divider, Drawer } from "antd";
import Camera from "./Camera";
import { CloseCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useCameraStore } from "../stores";

const CameraItem = ({ id, name, index, total }) => {
	const { removeCamera } = useCameraStore();
	const onItemClick = () => removeCamera(id);

	return (
		<div className="relative">
			<Button
				size="large"
				onClick={onItemClick}
				className="absolute top-0 right-0 border-none focus:outline-none shadow-none"
				icon={<CloseCircleOutlined />}
			/>
			<Descriptions column={1} size="ant">
				<Descriptions.Item label="Tuyến đường">{name}</Descriptions.Item>
				<Descriptions.Item label="Tình trạng">Kẹt xe</Descriptions.Item>
			</Descriptions>
			<Camera id={id} />
			{index < total - 1 && <Divider />}
		</div>
	);
};

const AppCameraDrawler = () => {
	const { cameras, setOpenAppDrawer, openCamerasDrawler } = useCameraStore();
	const onClose = () => setOpenAppDrawer(false);

	return (
		<Drawer
			zIndex={10}
			onClose={onClose}
			title="Thông tin tuyến đường"
			open={openCamerasDrawler}>
			{cameras.map((camera, index) => (
				<CameraItem
					key={camera.id}
					index={index}
					total={cameras.length}
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
