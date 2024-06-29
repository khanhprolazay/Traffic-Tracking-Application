/** @format */

import { Table, Tag, Typography } from 'antd';
const { Column } = Table;
import { VideoCameraOutlined } from '@ant-design/icons';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import data from '../mock/camera.mock.json';
import { StreetStatus } from '../constant';
import { useCameraStore } from '../stores';

function getColor(status) {
	switch (status) {
		case StreetStatus.CROWDED:
			return '#faad14';
		case StreetStatus.JAM:
			return '#ff4d4f';
		case StreetStatus.NORMAL:
			return '#52c41a';
		default:
			return '#1677ff';
	}
}

const TableStreet = ({ status, onItemClick }) => {
	const { cameras } = useCameraStore();
	const dataFilter = data
		.map((item) => ({ ...item, ...cameras[item.id] }))
		.filter((item) => status === null || item.status === status);

	return (
		<Table
			rootClassName="h-full overflow-auto relative"
			dataSource={dataFilter}
			pagination={false}>
			<Column
				title={
					<Typography className="text-center text-xs font-normal">
						Thành phố
					</Typography>
				}
				dataIndex="city"
				key="city"
				className="text-xs"
				width={125}
			/>
			<Column
				title={
					<Typography className="text-center text-xs font-normal">
						Tuyến đường
					</Typography>
				}
				dataIndex="name"
				key="name"
				className="text-xs"
				width={175}
			/>
			<ColumnGroup
				title="Số lượng xe lưu thông"
				className="text-xs !font-normal w-[25%]">
				<Column
					align="center"
					title="Xe 2 bánh"
					dataIndex="motobikes"
					key="motob'"
					width={65}
					className="text-xs !font-normal"
				/>
				<Column
					align="center"
					title="Xe 4 bánh trở lên"
					dataIndex="cars"
					key="cars"
					width={65}
					className="text-xs !font-normal"
				/>
			</ColumnGroup>
			<Column
				align="center"
				width={100}
				className="text-sm"
				title={
					<Typography className="text-center text-xs font-normal">
						Tình trạng
					</Typography>
				}
				dataIndex="status"
				key="id"
				filteredValue={[status]}
				filtered
				render={(status) => {
					let color = getColor(status);
					return (
						<Tag color={color} key={status} className="font-semibold">
							{Object.keys(StreetStatus).find(
								(key) => StreetStatus[key] === status
							) || "LOADING"}
						</Tag>
					);
				}}
			/>
			<Column
				align="center"
				width={110}
				className="text-sm"
				title={
					<Typography className="text-center text-xs font-normal">
						Xem trực tiếp
					</Typography>
				}
				key="id"
				render={(id) => <VideoCameraOutlined onClick={() => onItemClick(id)} />}
			/>
		</Table>
	);
};

export default TableStreet;
