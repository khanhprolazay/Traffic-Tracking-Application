import { Col, Row, Switch } from "antd";
import { useState } from "react";
import DashboardCard from "./components/DashboardCard";
import { TableOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TableStreet from "../../components/TableStreet";
import Camera from "../../components/Camera";
import AppGoogleMap from "../../components/AppGoogleMap";
import { useCameraStore } from "../../stores";

export default function Home() {
	const [isMapView, setIsMapView] = useState(true);
	const [status, setStatus] = useState(null);

	const { pushCamera } = useCameraStore();
	const onClick = (id) => pushCamera(id);

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
						content={32}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường thông thoáng"
						status={1}
						content={24}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường đông đúc"
						status={2}
						content={16}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường kẹt xe"
						status={3}
						content={8}
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
						/>
					) : (
						<TableStreet status={status} onItemClick={onClick}/>
					)}
				</Col>

				<Col
					span={8}
					className="h-full flex flex-col gap-6 no-scroll-bar overflow-auto">
					<Camera id="58af9a07bd82540010390c3b" />
					<Camera id="58af8d68bd82540010390c2e" />
					<Camera id="58175c81edeb6c0012a2d5c2" />
				</Col>
			</Row>
		</div>
	);
}
