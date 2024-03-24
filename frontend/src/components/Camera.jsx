import { Image } from "antd";
// import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';


const Camera = ({ id }) => {
	const { time } = useSelector((state) => state.app);
	return (
		<div>
			<Image
				rootClassName="w-full"
				src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${time}`}
			/>
		</div>
	);
};

Camera.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Camera;
