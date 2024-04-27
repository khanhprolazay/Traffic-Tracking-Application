export class QueryBuilder {
	constructor(bucket, measurement) {
		this.query = "";
    this.bucket = bucket;
    this.measurement = measurement;
	}

	withBucket() {
		this.query += `\n  from(bucket: "${this.bucket}")`;
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
		this.query += `\n  |> filter(fn: (r) => r._measurement == "${this.measurement}")`;
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
    const query = this.query;
		this.query = "";
    return query;
	}
}