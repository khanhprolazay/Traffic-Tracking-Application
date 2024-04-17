export function getTimeString(timestamp) {
	const date = arguments.length ? new Date(timestamp) : new Date();
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};