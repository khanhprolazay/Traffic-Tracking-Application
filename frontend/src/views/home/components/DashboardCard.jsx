import { Card, Typography, Row, Tooltip, Divider } from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { StreetStatus } from "../../../constant";

const DashboardCard = ({ title, status, content, onChangeTable }) => {
	function getColor(status) {
		switch (status) {
			case StreetStatus.NORMAL:
				return "text-success";
			case StreetStatus.CROWDED:
				return "text-warning";
			case StreetStatus.JAM:
				return "text-error";
			default:
				return "text-primary";
		}
	}

	return (
		<Card
			classNames={{ body: "!pb-2" }}
			key={status}
			title={title}>
			<Typography className={`${getColor(status)} text-2xl font-semibold`}>
				{content}
			</Typography>
			<Divider className="my-2" />
			<Row className="h-full justify-center gap-3 cursor-pointer text-lg opacity-50 transition-opacity">
				<Tooltip title="Xem" className="hover:opacity-20">
					<EyeOutlined onClick={() => onChangeTable(false, status)} />
				</Tooltip>
				<Tooltip title="Lọc" className="hover:opacity-20">
					<FilterOutlined onClick={() => onChangeTable(true, status)} />
				</Tooltip>
			</Row>
		</Card>
	);
};

export default DashboardCard;
