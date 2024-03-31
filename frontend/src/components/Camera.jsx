import { Image } from "antd";
// import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';


const Camera = ({ id }) => {
	const { time } = useSelector((state) => state.app);
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
