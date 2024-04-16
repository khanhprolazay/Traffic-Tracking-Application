import { Card, Typography, Row, Tooltip, Divider } from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";

const DashboardCard = ({ title, status, content, onChangeTable }) => {
	function getColor(status) {
		switch (status) {
			case 1:
				return "text-success";
			case 2:
				return "text-warning";
			case 3:
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
					<EyeOutlined onClick={() => onChangeTable(true, status)} />
				</Tooltip>
				<Tooltip title="Lọc" className="hover:opacity-20">
					<FilterOutlined onClick={() => onChangeTable(false, status)} />
				</Tooltip>
			</Row>
		</Card>
	);
};

export default DashboardCard;
