import { Card, Typography } from "antd";
import PropTypes from 'prop-types';


const DashboardCard = (props) => {
	const { title, status, content } = props;

	function getColor(status) {
		switch (status) {
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
		<Card title={<span className="text-base font-normal">{title}</span>} className="h-32">
			<Typography className={`${getColor(status)} | text-3xl font-bold`}>{content}</Typography>
			<div className="w-full py-2 flex justify-around items-center border-t border-t-slate-200 mt-2" />
		</Card>
	);
};

DashboardCard.propTypes = {
	title: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	content: PropTypes.number.isRequired
}
export default DashboardCard;
