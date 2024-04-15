import { Image } from "antd";
import PropTypes from 'prop-types';
import { useCameraStore } from "../stores";

const Camera = ({ id }) => {
	const { time } = useCameraStore();
	return (
			<Image
				rootClassName="w-full"
				src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${time}`}
			/>
	);
};

Camera.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Camera;
