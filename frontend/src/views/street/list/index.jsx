import { Col, Row } from "antd";
import TableStreet from "../../../components/TableStreet";

export default function Page() {
	return (
		<Row justify="center" className="p-6">
			<Col span={20}>
				<TableStreet />
			</Col>
		</Row>
	);
}
