import { Col, Row } from "antd";
import DashboardCard from "./components/DashboardCard";
import AppGoogleMap from "../../components/AppGoogleMap";
import Camera from "../../components/Camera";

export const HomePage = () => {
	return (
		<div>
			<div className=" p-6 flex flex-col gap-6">
				<Row gutter={24} className="h-[126px]">
					<Col span={6}>
						<DashboardCard title="Tổng tuyến đường" content={32} />
					</Col>
					<Col span={6}>
						<DashboardCard
							title="Tuyến đường thông thoáng"
							status="success"
							content={24}
						/>
					</Col>
					<Col span={6}>
						<DashboardCard
							title="Tuyến đường ùn ứ"
							status="warning"
							content={16}
						/>
					</Col>
					<Col span={6}>
						<DashboardCard
							title="Tuyến đường kẹt xe"
							status="error"
							content={8}
						/>
					</Col>
				</Row>
				<Row gutter={24} className="h-[calc(100vh-297px)]">
					<Col span={16} className="h-full z-[2]">
						<AppGoogleMap showCamera={true}/>
					</Col>
					<Col span={8} className="h-full flex flex-col gap-6 no-scroll-bar overflow-auto">
						<Camera id="58af9a07bd82540010390c3b" />
						<Camera id="58af8d68bd82540010390c2e" />
						<Camera id="58175c81edeb6c0012a2d5c2" />
					</Col>
				</Row>
			</div>
		</div>
	);
};
