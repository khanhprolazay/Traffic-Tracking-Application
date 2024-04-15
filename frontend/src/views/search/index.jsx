import { Col, Row } from "antd";
import { useState } from "react";
import Siderbar from "./components/Sidebar";
import AppGoogleMap from "../../components/AppGoogleMap";

export default function Page() {
	const [state, setState] = useState({
		camera: true,
		traffic: true,
		station: false,
		poi: false,
	});

	const onItemClick = (key) =>
		setState((prev) => ({
			...prev,
			[key]: !prev[key],
		}));

	return (
		<div>
			<Row gutter={24} style={{ margin: 0 }} className="h-[calc(100vh-100px)]">
				<Col span={6} className="p-0">
					<Siderbar state={state} onItemClick={onItemClick} />
				</Col>
				<Col span={18} style={{ padding: 0 }}>
					<AppGoogleMap
						showCamera={state.camera}
						traffic={state.traffic}
						station={state.station}
						poi={state.poi}
						showSearch={true}
					/>
				</Col>
			</Row>
		</div>
	);
}
