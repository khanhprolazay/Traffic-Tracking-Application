import { Col, Row, Switch } from "antd";
import { useState } from "react";
import DashboardCard from "./components/DashboardCard";
import { TableOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TableStreet from "../../components/TableStreet";
import Camera from "../../components/Camera";
import AppGoogleMap from "../../components/AppGoogleMap";

export default function Home() {
	const [isMapView, setIsMapView] = useState(true);
	const [type, setType] = useState("primary");

	const handleChangeTable = (status, type) => {
		setIsMapView(status);
		setType(type);
	};

	return (
		<div className=" p-6 flex flex-col gap-6">
			<Row gutter={24}>
				<Col span={6}>
					<DashboardCard
						title="Tổng tuyến đường"
						typeBox="primary"
						content={32}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường thông thoáng"
						typeBox="success"
						content={24}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường đông đúc"
						typeBox="warning"
						content={16}
						onChangeTable={handleChangeTable}
					/>
				</Col>
				<Col span={6}>
					<DashboardCard
						title="Tuyến đường kẹt xe"
						typeBox="error"
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
							setType("primary");
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
						<TableStreet type={type} />
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
