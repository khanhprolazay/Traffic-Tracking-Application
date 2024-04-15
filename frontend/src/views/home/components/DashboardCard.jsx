import { Card, Typography, Row, Tooltip, Divider } from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const DashboardCard = ({ title, typeBox, content, onChangeTable }) => {
	function getColor(typeBox) {
		switch (typeBox) {
			case "success":
				return "text-success";
			case "warning":
				return "text-warning";
			case "error":
				return "text-error";
			default:
				return "text-primary";
		}
	}

	return (
		<Card
			classNames={{ body: "!pb-2" }}
			key={typeBox}
			title={title}>
			<Typography className={`${getColor(typeBox)} text-2xl font-semibold`}>
				{content}
			</Typography>
			<Divider className="my-2" />
			<Row className="h-full justify-center gap-3 cursor-pointer text-lg opacity-50 transition-opacity">
				<Tooltip title="Xem" className="hover:opacity-20">
					<EyeOutlined onClick={() => onChangeTable(true, typeBox)} />
				</Tooltip>
				<Tooltip title="Lọc" className="hover:opacity-20">
					<FilterOutlined onClick={() => onChangeTable(false, typeBox)} />
				</Tooltip>
			</Row>
		</Card>
	);
};

DashboardCard.propTypes = {
	title: PropTypes.string.isRequired,
	typeBox: PropTypes.string.isRequired,
	content: PropTypes.number.isRequired,
	onChangeTable: PropTypes.any.isRequired,
};
export default DashboardCard;
