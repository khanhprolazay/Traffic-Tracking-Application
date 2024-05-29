import Notify from "../components/Notify";
import { Card, Col, Divider, Flex, Progress, Row, Space, Tag, Typography } from "antd";
import ExtraInformation from "../components/ExtraInformation";
import RealtimeChart from "../components/RealtimeChart";
import { useDataStore, useDetailStore } from "../../../stores";
import Camera from "../../../components/Camera"

export default function Page() {
	const { latestPoint } = useDataStore();
	const { data } = useDetailStore();
	// console.log(data)
	const get = (key) => latestPoint[key];



	return (
		<Row gutter={[24, 24]} className="py-6 px-3 !mx-0">
			<Col span={24}>
				<Typography.Title className="!mb-0 !leading-none" level={3}>
					Tuyến đường: <span className="font-normal">{data.nameStreet}</span>
					<Tag className="inline-block text-[11px] relative top-[-3px] ml-2" color={`${data.status == 2 ? 'warning' : data.status == 3 ? 'error' : 'success'}`}>
						{data.status == 2 ? 'Đông đúc' : data.status == 3 ? 'Kẹt xe' : 'Thông thoáng'}
					</Tag>
				</Typography.Title>
				<div className="mt-1 flex gap-2 flex-wrap">
					<ExtraInformation title="Ngày bắt đầu" content={data.startDate} />
					<ExtraInformation title="Thời gian hoạt động" content={`${data.alongDate} ngày`} />
					<ExtraInformation title="Tổng số xe dự tính" content={data.totalVehicle} />
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
					title={
						<Space>
							Số xe 2 bánh
						</Space>
					}
					rootClassName="border-b border-[#3D98D3]"
				>
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-3xl">{get("bike")}20</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={8}>
				<Card
					bordered={false}
					title={
						<Space>
							Số xe 4 bánh trở lên
						</Space>
					}
					className="border-b border-[#52e052]">
					<Flex justify="space-between" align="center">
						<Typography.Text className="!text-3xl">{get("car")}5</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={8}>
				<Card
					bordered={false}
					title='Tổng số xe hiện tại'
					rootClassName="border-b border-[#F64747]"
				>
					<Flex justify="space-between" align="center">
						<Typography.Text className="text-3xl">{get("total")}25</Typography.Text>
					</Flex>
				</Card>
			</Col>
			<Col span={6} className="flex flex-col gap-6">
				<Card
					title="Hình ảnh giao thông hiện tại"
					classNames={{
						body: "flex justify-center items-center h-full p-0",
					}}
					className="flex flex-col"
					bordered={false}>
					<Camera id={data.cameraID} />
				</Card>
				<Card
					title="Tỉ lệ lấp đầy"
					classNames={{
						body: "flex justify-center items-center h-full",
					}}
					className="h-full flex flex-col"
					bordered={false}>
					<Progress type="dashboard" percent={Math.round(get("total") / 40 * 100)} />
				</Card>
			</Col>
			<Col span={18}>
				<RealtimeChart />
			</Col>
			{/* {data.type == "VIDEO" &&
				<Col span={24}>
					<iframe
						width="100%"
						height="580px"
						// src={`https://www.youtube.com/embed/${data.cameraID}?autoplay=1`}
						src={videoDemo}
						title="YouTube video player"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
					<div id="capture">
						<video
							width="100%"
							height="580px"
							controls
							autoPlay
						>
							<source
								src={videoDemo}
								type="video/mp4"
							/>
						</video>
					</div>
				</Col>
			} */}
		</Row>
	);
}
