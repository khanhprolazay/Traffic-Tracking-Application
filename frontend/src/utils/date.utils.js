export function getTimeString(timestamp) {
	const date = arguments.length ? new Date(timestamp) : new Date();
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export function toDate(value, format = "unix") {
	switch (format) {
		case "unix":
			return new Date(value * 1000);
		case "iso":
			return new Date(value);
		default:
			return new Date(value);
	}
}