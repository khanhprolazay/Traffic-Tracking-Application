import React, { useEffect, useState } from 'react';
import { Image } from "antd";
import PropTypes from 'prop-types';
import { useCameraStore } from "../stores";

const Camera = ({ id }) => {
  const { time } = useCameraStore();
  const [refreshTime, setRefreshTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date().getTime());
    }, 12000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      rootClassName="w-full"
      src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${refreshTime}`}
    />
  );
};

Camera.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Camera;
