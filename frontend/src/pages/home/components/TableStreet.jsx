import { Table, Tag, Typography } from 'antd';
const { Column } = Table;
import { VideoCameraOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { pushCamera } from '../../../app/slices/app.slice';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import PropTypes from 'prop-types';


const TableStreet = ({ data, typeData }) => {

    const dispatch = useDispatch();

    const onMarkerClick = (camera) => {
        dispatch(pushCamera(camera));
    };

    const dataHandle = typeData.toUpperCase() === 'SUCCESS'
        ? data.filter(item => item.status.toUpperCase() === "THÔNG THOÁNG")
        : typeData.toUpperCase() === 'WARNING'
            ? data.filter(item => item.status.toUpperCase() === "ĐÔNG ĐÚC")
            : typeData.toUpperCase() === 'ERROR'
                ? data.filter(item => item.status.toUpperCase() === "KẸT XE")
                : data;

    return (
        <Table rootClassName='h-full overflow-auto relative' dataSource={dataHandle} pagination={false}>
            <Column title={<Typography className='text-center text-xs font-normal'>Tên tuyến đường</Typography>} dataIndex="name" key="name" className='text-xs' width={300} />
            <ColumnGroup title="Số lượng xe lưu thông" className='text-xs !font-normal' >
                <Column align='center' title="Xe Máy" dataIndex="bike" key="bike" width={65} className='text-xs !font-normal' />
                <Column align='center' title="Xe Ôtô" dataIndex="oto" key="oto" width={65} className='text-xs !font-normal' />
                <Column align='center' title="Xe Bus" dataIndex="bus" key="bus" width={65} className='text-xs !font-normal' />
                <Column align='center' title="Xe Tải" dataIndex="truck" key="truck" width={65} className='text-xs !font-normal' />
            </ColumnGroup>
            <Column
                align='center'
                width={100}
                className='text-sm'
                title={<Typography className='text-center text-xs font-normal'>Tình trạng</Typography>}
                dataIndex="status"
                key="status"
                render={(status) => {
                    let color = status.toUpperCase() === 'THÔNG THOÁNG' ? '#52c41a' : status.toUpperCase() === 'ĐÔNG ĐÚC' ? '#faad14' : '#ff4d4f';
                    return (
                        <Tag color={color} key={status} className='font-semibold'>
                            {status.toUpperCase()}
                        </Tag>
                    )
                }}
            />
            <Column
                align='center'
                width={110}
                className='text-sm'
                title={<Typography className='text-center text-xs font-normal'>Xem trực tiếp</Typography>}
                key="id"
                render={(id) => (
                    <VideoCameraOutlined onClick={() => onMarkerClick(id)} />
                )}
            />
        </Table>
    )
}

TableStreet.propTypes = {
    data: PropTypes.any.isRequired,
    typeData: PropTypes.string.isRequired
}

export default TableStreet;