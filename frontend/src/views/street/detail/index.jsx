import Notify from "../components/Notify";
import { useThemeStore } from "../../../stores/ThemeStore";
import BikeIcon from "../components/icons/Bike";
import BusIcon from "../components/icons/Bus";
import CarIcon from "../components/icons/Car";
import TruckIcon from "../components/icons/Truck";
import { Line } from "@ant-design/charts";
import { Card, Col, Divider, Flex, Progress, Row, Tag, Typography } from "antd";
import ExtraInformation from "../components/ExtraInformation";
import { ProForm, ProFormSelect } from "@ant-design/pro-components";

const lineConfig = {
	data: {
		type: "fetch",
		value:
			"https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-connect-nulls.json",
		transform: [
			{
				type: "map",
				callback: (d) => ({
					...d,
					close: new Date(d.date).getUTCMonth() < 3 ? NaN : d.close,
				}),
			},
		],
	},
	xField: (d) => new Date(d.date),
	yField: "close",
	connectNulls: {
		connect: true,
		connectStroke: "#aaa",
	},
};

export default function Page() {
	const { darkMode } = useThemeStore();

	return (
		<Row gutter={[24, 24]} className="py-6 px-3 !mx-0">
			<Col span={24}>
				<Typography.Title className="!mb-0 !leading-none" level={3}>
					Tuyến đường: <span className="font-normal">Hoàng Hoa Thám</span>
					<Tag className="inline-block relative top-[-5px] ml-2" color="green">
						Thông thoáng
					</Tag>
				</Typography.Title>
				<div className="mt-1 flex gap-2 flex-wrap">
					<ExtraInformation title="Ngày bắt đầu" content="26/11/2023" />
					<ExtraInformation title="Thời gian hoạt động" content="136 ngày" />
					<ExtraInformation title="Tổng số xe dự tính" content="500" />
				</div>
			</Col>

			<Divider className="my-0 mx-[12px]" />
			<Col span={24} className="!mx-0">
				<Typography.Title level={3}>Tình trạng camera</Typography.Title>
				<Notify message="Hoạt động" status="success" />
			</Col>

			<Divider className="my-0 mx-[12px]" />

			<Col span={6}>
				<Card
					bordered={false}
					title="Số xe máy"
					rootClassName="border-b border-[#3D98D3]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-2xl">5</Typography.Text>
						<BikeIcon fill="#ffffffd9" />
					</Flex>
				</Card>
			</Col>
			<Col span={6}>
				<Card
					bordered={false}
					title="Số xe ô tô"
					className="border-b border-[#5D995D]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-2xl">5</Typography.Text>
						<CarIcon fill="#ffffffd9" />
					</Flex>
				</Card>
			</Col>
			<Col span={6}>
				<Card
					bordered={false}
					title="Số xe bus"
					className="border-b border-[#DAC342]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-2xl">5</Typography.Text>
						<BusIcon fill="#ffffffd9" />
					</Flex>
				</Card>
			</Col>
			<Col span={6}>
				<Card
					bordered={false}
					title="Số xe tải"
					className="border-b border-[#F64747]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-2xl">5</Typography.Text>
						<TruckIcon fill="#ffffffd9" />
					</Flex>
				</Card>
			</Col>
			<Col span={6} className="flex flex-col gap-6">
				<Card
					title="Tổng số xe hiện tại"
					classNames={{
						body: "flex justify-center items-center h-full",
					}}
					className="h-full flex flex-col"
					bordered={false}>
					<Typography.Text className="text-5xl">120</Typography.Text>
				</Card>
				<Card
					title="Tỉ lệ lấp đầy"
					classNames={{
						body: "flex justify-center items-center h-full",
					}}
					className="h-full flex flex-col"
					bordered={false}>
					<Progress type="dashboard" percent={30} />
				</Card>
			</Col>
			<Col span={18}>
				<Line
					className="h-[480px]"
					{...lineConfig}
					theme={darkMode && "dark"}
				/>
			</Col>
			<Col span={24}>
				<iframe
					width="100%"
					height="580px"
					src="https://www.youtube.com/embed/ojcp6BTYHSU"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</Col>
			<Col span={24}>
				<Card>
					<ProForm
						grid
						layout="vertical"
						submitter={<></>}
						params={{}}
						rowProps={{ gutter: [16, 16] }}>
						<ProFormSelect
							colProps={{ xl: 4, md: 12 }}
							label="Group by"
							name="level"
							valueEnum={{
								day: "Ngày",
								week: "Tuần",
								month: "Tháng",
								year: "Năm",
							}}
						/>
					</ProForm>
				</Card>
			</Col>
		</Row>
	);
}
