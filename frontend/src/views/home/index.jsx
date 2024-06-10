import { Col, Row, Switch } from "antd";
import { useState } from "react";
import DashboardCard from "./components/DashboardCard";
import { TableOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TableStreet from "../../components/TableStreet";
import Camera from "../../components/Camera";
import AppGoogleMap from "../../components/AppGoogleMap";
import { useCameraStore } from "../../stores";
import dataCamera from '../../mock/data.camera.dashboard.json';
import { StreetStatus } from "../../constant";


export default function Home() {
	const [isMapView, setIsMapView] = useState(true);
	const [status, setStatus] = useState(null);

	const { pushDrawlerCamera, analysys, total } = useCameraStore();
	const onClick = (id) => pushDrawlerCamera(id);

	const handleChangeTable = (mapView, status) => {
		setIsMapView(!mapView);
		setStatus(status);
	};

	return (
		<div className=" p-6 flex flex-col gap-6">
			<Row gutter={24}>
				<Col span={6}>
					<DashboardCard
						title="Tổng tuyến đường"
						status={null}
						content={total}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường thông thoáng"
						status={1}
						content={analysys[StreetStatus.NORMAL] || 0}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường đông đúc"
						status={2}
						content={analysys[StreetStatus.CROWDED] || 0}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường kẹt xe"
						status={3}
						content={analysys[StreetStatus.JAM] || 0}
						onChangeTable={handleChangeTable}
					/>
				</Col>
			</Row>

			<Row gutter={24} className="h-[calc(100vh-297px)]">
				<Col span={16} className="h-full max-h-full z-20 relative">
					<Switch
						className="absolute ml-2 mt-2 z-10"
						rootClassName="bg-slate-400"
						unCheckedChildren={<VideoCameraOutlined />}
						checkedChildren={<TableOutlined />}
						checked={!isMapView}
						onChange={() => {
							setIsMapView(state => !state);
							setStatus(null);
						}}
					/>
					{isMapView ? (
						<AppGoogleMap
							showCamera={true}
							traffic={true}
							station={false}
							poi={false}
							showSearch={false}
							dataCamera = {dataCamera}
						/>
					) : (
						<TableStreet status={status} onItemClick={onClick}/>
					)}
				</Col>

				<Col
					span={8}
					className="h-full flex flex-col gap-6 no-scroll-bar overflow-auto">
					<Camera id="5d8cdb9f766c880017188968" />
					<Camera id="662b80051afb9c00172dcaf6" />
					<Camera id="662b5a401afb9c00172d91fc" />
				</Col>
			</Row>
		</div>
	);
}
