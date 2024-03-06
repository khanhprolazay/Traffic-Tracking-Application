import { Image } from "antd";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Camera = ({ id }) => {
	const { time } = useSelector((state) => state.app);
	return (
		<Image
			rootClassName="w-full"
			src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${time}`}
		/>
	);
};

export default Camera;
