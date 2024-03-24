import { Card, Typography, Row, Tooltip } from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons"
import PropTypes from 'prop-types';


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

	const hanldeChangeData = (statusSwitch, type) => {
		onChangeTable(statusSwitch, type)
	}

	return (
		<Card key={typeBox} title={<span className="text-base font-normal">{title}</span>} className="h-32">
			<Typography className={`${getColor(typeBox)} | text-2xl font-semibold`}>{content}</Typography>
			<div className="w-full py-2 flex justify-around items-center border-t border-t-slate-200 mt-2" />
			<Row className="justify-center gap-3 -mt-1 cursor-pointer text-lg opacity-50 transition-opacity">
				<Tooltip title='Xem' className="hover:opacity-20">
					<EyeOutlined onClick={() => { hanldeChangeData(true, typeBox) }} />
				</Tooltip>
				<Tooltip title='Lọc' className="hover:opacity-20">
					<FilterOutlined onClick={() => { hanldeChangeData(false, typeBox) }} />
				</Tooltip>
			</Row>
		</Card>
	);
};

DashboardCard.propTypes = {
	title: PropTypes.string.isRequired,
	typeBox: PropTypes.string.isRequired,
	content: PropTypes.number.isRequired,
	onChangeTable: PropTypes.any.isRequired
}
export default DashboardCard;
