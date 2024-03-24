import { Row, Col } from "antd";
import AppGoogleMap from "../../components/AppGoogleMap";
import Siderbar from "./components/Sidebar";
import { useState } from "react";

export const SearchPage = () => {

    const sidebarSearchLocal = JSON.parse(localStorage.getItem('sidebarSearch'))

    const [camera, setCamera] = useState(sidebarSearchLocal[0]);
    const [traffic, setTraffic] = useState(sidebarSearchLocal[1]);
    const [station, setStation] = useState(sidebarSearchLocal[2]);
    const [poi, setPoi] = useState(sidebarSearchLocal[3]);


    const handleRowSidebarChange = (newCamera, newTraffic, newStation, newPoi) => {
        setCamera(newCamera);
        setTraffic(newTraffic);
        setStation(newStation);
        setPoi(newPoi);
    };


    return (
        <div>
            <Row gutter={24} style={{ margin: 0 }} className="h-[calc(100vh-100px)]" >
                <Siderbar onChangeStatus={handleRowSidebarChange} sidebarSearchLocal={sidebarSearchLocal} />
                <Col span={18} style={{ padding: 0 }}>
                    <AppGoogleMap showCamera={camera} traffic={traffic} station={station} poi={poi} showSearch={true} />
                </Col>
            </Row>

        </div>
    );
};

