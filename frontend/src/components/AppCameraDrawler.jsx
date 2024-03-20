import { Button, Descriptions, Divider, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Camera from "./Camera";
import { removeCamera, setOpenAppDrawer } from "../app/slices/app.slice";
import { CloseCircleOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';

const CameraItem = ({ id, name, dispatch, index, total }) => {
	const onItemClick = () => dispatch(removeCamera(id));

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
	const dispatch = useDispatch();
	const cameras = useSelector((state) => state.app.cameras);
	const openCamerasDrawler = useSelector(
		(state) => state.app.openCamerasDrawler
	);

	const onClose = () => dispatch(setOpenAppDrawer(false));

	return (
		<Drawer
			zIndex={1}
			onClose={onClose}
			title="Thông tin tuyến đường"
			open={openCamerasDrawler}>
			{cameras.map((camera, index) => (
				<CameraItem
					key={camera.id}
					dispatch={dispatch}
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
	dispatch: PropTypes.any.isRequired,
	index: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
}

export default AppCameraDrawler;
