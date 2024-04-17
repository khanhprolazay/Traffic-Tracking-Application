import { InfluxDB } from "@influxdata/influxdb-client-browser";
import {
	INFLUX_URL,
	INFLUX_TOKEN,
	INFLUX_ORG,
	INFLUX_MEAUREMENT,
	INFLUX_BUCKET,
} from "../config";

const client = new InfluxDB({
	url: INFLUX_URL,
	token: INFLUX_TOKEN,
}).getQueryApi(INFLUX_ORG);

class QueryBuilder {
	constructor() {
		this.query = "";
	}

	withBucket() {
		this.query += `\n  from(bucket: "${INFLUX_BUCKET}")`;
		return this;
	}

	withRange(begin, end) {
		this.query += `\n  |> range(start: ${begin}, stop: ${end})`;
		return this;
	}

	withStart(start) {
		return this.withRange(start, "now()");
	}

	withMeasurement() {
		this.query += `\n  |> filter(fn: (r) => r._measurement == "${INFLUX_MEAUREMENT}")`;
		return this;
	}

  last() {
    this.query += `\n  |> last()`;
    return this;
  }

	tail(n) {
		this.query += `\n  |> tail(n: ${n})`;
		return this;
}

	build() {
		return this.query;
	}
}

export function getInitialData() {
	const query = new QueryBuilder()
		.withBucket()
		.withStart("-3m")
		.withMeasurement()
		.tail(60)
		.build();
	return client.collectRows(query);
}

export function getLatestPoint() {
	const query = new QueryBuilder()
    .withBucket()
		.withStart("-5s")
    .withMeasurement()
		.last()
    .build();
  return client.collectRows(query);
}
