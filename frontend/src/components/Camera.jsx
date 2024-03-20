import { Image, Typography } from "antd";
// import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';


const Camera = ({ id, name }) => {
	const { time } = useSelector((state) => state.app);
	return (
		<div>
			<Image
				rootClassName="w-full"
				src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${time}`}
			/>
			<Typography className="-mt-1 text-base font-semibold text-center">{name}</Typography>
			<div className="w-full py-2 flex justify-around items-center border-t border-t-slate-400 mt-2" />

		</div>
	);
};

Camera.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default Camera;
