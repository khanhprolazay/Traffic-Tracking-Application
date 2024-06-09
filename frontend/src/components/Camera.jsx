import React, { useEffect, useState } from 'react';
import { Image } from "antd";
import PropTypes from 'prop-types';
import { useCameraStore } from "../stores";
import { PROXY_URL } from '../config';

const Camera = ({ id }) => {
  const { time } = useCameraStore();

  return (
    // <Image
    //   rootClassName="w-full"
    //   src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${id}&t=${refreshTime}`}
    // />
    <Image
      rootClassName="w-full"
      src={`${PROXY_URL}/public/images/${id}.jpeg?t=${time}`}
    />
  );
};

Camera.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Camera;
