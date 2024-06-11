/** @format */

import Notify from '../components/Notify';
import {
	Card,
	Col,
	Divider,
	Flex,
	Progress,
	Row,
	Space,
	Tag,
	Typography,
} from 'antd';
import ExtraInformation from '../components/ExtraInformation';
import RealtimeChart from '../components/RealtimeChart';
import { useDataStore, useCameraStore } from '../../../stores';
import Camera from '../../../components/Camera';
import { useParams } from 'react-router-dom';
import { StreetStatusText } from '../../../constant';

function getColor(status) {
	switch (status) {
		case 1:
			return 'warning';
		case 0:
			return 'error';
		case 2:
			return 'success';
		default:
			return 'geekblue';
	}
}

export default function Page() {
	const { id } = useParams();
	const { latestPoint } = useDataStore();
	const { cameras } = useCameraStore();
	const get = (key) => latestPoint[key];
	const camera = cameras[id];

	console.log(camera)

	return (
		<Row gutter={[24, 24]} className="py-6 px-3 !mx-0">
			<Col span={24}>
				<Typography.Title className="!mb-0 !leading-none" level={3}>
					Tuyến đường: <span className="font-normal">{camera.name}</span>
					<Tag
						className="inline-block text-[11px] relative top-[-3px] ml-2"
						color={getColor(camera.status)}>
						{StreetStatusText[camera.status] || 'Đang tải'}
					</Tag>
				</Typography.Title>
				<div className="mt-1 flex gap-2 flex-wrap">
					<ExtraInformation title="Ngày bắt đầu" content="10/06/2024" />
					<ExtraInformation title="Thời gian hoạt động" content="36 ngày" />
					<ExtraInformation title="Tổng số xe dự tính" content="50" />
				</div>
			</Col>

			<Divider className="my-0 mx-[12px]" />
			<Col span={24} className="!mx-0">
				<Typography.Title level={3}>Tình trạng camera</Typography.Title>
				<Notify message="Hoạt động" status="success" />
			</Col>

			<Divider className="my-0 mx-[12px]" />

			<Col span={8}>
				<Card
					bordered={false}
					title={<Space>Số xe 2 bánh</Space>}
					rootClassName="border-b border-[#3D98D3]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-3xl">
							{camera.motobikes || 0}
						</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={8}>
				<Card
					bordered={false}
					title={<Space>Số xe 4 bánh trở lên</Space>}
					className="border-b border-[#52e052]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-3xl">
							{camera.cars || 0}
						</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={8}>
				<Card
					bordered={false}
					title="Tổng số xe hiện tại"
					rootClassName="border-b border-[#F64747]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="text-3xl">
							{get('total')}25
						</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={6} className="flex flex-col gap-6">
				<Card
					title="Hình ảnh giao thông hiện tại"
					classNames={{
						body: 'flex justify-center items-center h-full p-0',
					}}
					className="flex flex-col"
					bordered={false}>
					<Camera id={camera.id} />
				</Card>
				<Card
					title="Tỉ lệ lấp đầy"
					classNames={{
						body: 'flex justify-center items-center h-full',
					}}
					className="h-full flex flex-col"
					bordered={false}>
					<Progress
						type="dashboard"
						percent={Math.round((get('total') / 40) * 100)}
					/>
				</Card>
			</Col>
			<Col span={18}>{/* <RealtimeChart /> */}</Col>
		</Row>
	);
}
