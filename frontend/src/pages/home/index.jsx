import { Col, Row } from "antd";
import DashboardCard from "./components/DashboardCard";
import { AppGoogleMap } from "../../components";

export const HomePage = () => {
	return (
		<div className="min-h-full flex flex-col gap-6">
			<Row gutter={24}>
				<Col span={8}>
					<DashboardCard
						title="Tuyến đường thông thoáng"
						status="success"
						content={24}
					/>
				</Col>
				<Col span={8}>
					<DashboardCard
						title="Tuyến đường ùn ứ"
						status="warning"
						content={16}
					/>
				</Col>
				<Col span={8}>
					<DashboardCard
						title="Tuyến đường kẹt xe"
						status="error"
						content={8}
					/>
				</Col>
			</Row>
			<AppGoogleMap className="flex-1 min-h-[400px]" />
		</div>
	);
};
