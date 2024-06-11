import { InfluxDB } from "@influxdata/influxdb-client-browser";
import {
	INFLUX_URL,
	INFLUX_TOKEN,
	INFLUX_ORG,
	INFLUX_BUCKET,
	INFLUX_MEASUREMENT,
} from "../config";
import { QueryBuilder } from "../utils";

const client = new InfluxDB({
	url: INFLUX_URL,
	token: INFLUX_TOKEN,
}).getQueryApi(INFLUX_ORG);

const queryBuilder = new QueryBuilder(INFLUX_BUCKET, INFLUX_MEASUREMENT);

export function getCameraData(id) {
	const query = queryBuilder
		.withBucket()
		.withStart("-12h")
		.withMeasurement()
		.withCamera(id)
		.withCameraField()
		.tail(60)
		.build();
	return client.collectRows(query);
}

export function getLatestPoint() {
	const query = queryBuilder
		.withBucket()
		.withStart("-5s")
		.withMeasurement()
		.last()
		.build();
	return client.collectRows(query);
}
