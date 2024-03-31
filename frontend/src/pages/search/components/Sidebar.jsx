import { Row, Col, Checkbox, Typography, Image } from "antd";
import { useState } from "react";
import PropTypes from 'prop-types';
import cameraIcon from "../../../assets/images/camera.png";
import trafficIcon from "../../../assets/images/traffic.png";
import stationIcon from "../../../assets/images/station.png";
import poiIcon from "../../../assets/images/poi.png";

const Siderbar = ({ onChangeStatus, sidebarSearchLocal }) => {

    const [camera, setCamera] = useState(sidebarSearchLocal[0])
    const [traffic, setTraffic] = useState(sidebarSearchLocal[1])
    const [station, setStation] = useState(sidebarSearchLocal[2])
    const [poi, setPoi] = useState(sidebarSearchLocal[3])
    const [flag, setFlag] = useState(sidebarSearchLocal[4]) // Flag để  kiểm tra Local đã có dữ liệu chưa

    const hanldeStatus = (type) => {
        type == 'camera' ? setCamera(!camera)
            : type == 'traffic' ? setTraffic(!traffic)
                : type == 'station' ? setStation(!station)
                    : setPoi(!poi)
    }

    if (!flag) {    // Khởi tạo 4 biến
        setCamera(true)
        setTraffic(true)
        setStation(false)
        setPoi(false)
        setFlag(true)
    }

    localStorage.setItem('sidebarSearch', JSON.stringify([camera, traffic, station, poi, flag]));

    onChangeStatus(camera, traffic, station, poi)   // export giá trị của 4 biến về index.js

    return (
        <Col span={6} style={{ padding: 0 }}>
            <Row onClick={() => hanldeStatus('camera')} className="px-4 py-3 hover:bg-slate-400 relative hover:cursor-pointer">
                <Image preview={false} src={cameraIcon} />
                <Typography className="pl-1 font-normal text-base select-none">Camera</Typography>
                <Checkbox className="absolute top-1/2 transform -translate-y-1/2 right-4" checked={camera} />
            </Row>

            <Row onClick={() => hanldeStatus('traffic')} className="px-4 py-3 hover:bg-slate-400 relative hover:cursor-pointer">
                <Image preview={false} src={trafficIcon} />
                <Typography className="pl-1 font-normal text-base select-none">Tình trạng giao thông</Typography>
                <Checkbox className="absolute top-1/2 transform -translate-y-1/2 right-4" checked={traffic} />
            </Row>

            <Row onClick={() => hanldeStatus('station')} className="px-4 py-3 hover:bg-slate-400 relative hover:cursor-pointer">
                <Image preview={false} src={stationIcon} />
                <Typography className="pl-1 font-normal text-base select-none">Trạm giao thông công cộng</Typography>
                <Checkbox className="absolute top-1/2 transform -translate-y-1/2 right-4" checked={station} />
            </Row>

            <Row onClick={() => hanldeStatus('poi')} className="px-4 py-3 hover:bg-slate-400 relative hover:cursor-pointer">
                <Image preview={false} src={poiIcon} />
                <Typography className="pl-1 font-normal text-base select-none">Địa điểm quan trọng</Typography>
                <Checkbox className="absolute top-1/2 transform -translate-y-1/2 right-4" checked={poi} />
            </Row>

            {/* <Row>Biển báo tốc độ</Row> */}
        </Col>
    )
}

Siderbar.propTypes = {
    onChangeStatus: PropTypes.any.isRequired,
    sidebarSearchLocal: PropTypes.any.isRequired,
}

export default Siderbar