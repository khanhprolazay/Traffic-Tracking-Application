/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import { PROXY_URL } from '../config';

const Camera = ({ id }) => {
	const [frame, setFrame] = useState(null);

	useEffect(() => {
		const es = new EventSource(`${PROXY_URL}/camera/sse/image/${id}`);
		es.onopen = () => console.log('Connected to sse');
		es.onerror = () => {
			throw new Error('Error connecting to sse');
		};
		es.onmessage = (e) => {
			setFrame(e.data);
		};
	}, []);

	return (
		<Image
			rootClassName="w-full"
			src={
				frame
					? `data:image/jpeg;base64,${frame}`
					: `${PROXY_URL}/public/images/${id}.jpeg`
			}
		/>
	);
};

Camera.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Camera;
