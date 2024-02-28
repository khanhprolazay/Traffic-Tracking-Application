import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";

const cardClassNames = {
	header: "!border-b-0",
	title: "text-base font-normal",
	body: "!py-0 text-3xl",
};

const actions = [
	{
		icon: <FilterOutlined />,
		label: "Lọc",
	},
	{
		icon: <EyeOutlined />,
		label: "Chi tiết",
	},
];

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
		<Card classNames={cardClassNames} title={title}>
			<span className={getColor(status)}>{content}</span>
			<div className="w-full py-2 flex justify-around items-center border-t border-t-slate-200 mt-3">
				<div className="flex gap-4">
					{actions.map((action, key) => (
						<Tooltip key={key} title={action.label}>
							<div className="!text-base cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
								{action.icon}
							</div>
						</Tooltip>
					))}
				</div>
			</div>
		</Card>
	);
};
export default DashboardCard;
