import { Table, Tag, Typography } from 'antd';
const { Column } = Table;
import { VideoCameraOutlined } from '@ant-design/icons'
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { useCameraStore } from '../stores';
import data from "../mock/data.street.mock.json";

const TableStreet = ({ type = "primary" }) => {

    const { pushCamera } = useCameraStore();
    const onClick = (id) => pushCamera(id);

    let dataSource;
    switch (type.toUpperCase()) {
        case 'SUCCESS':
            dataSource = data.filter(item => item.status.toUpperCase() === "THÔNG THOÁNG");
            break;
        case 'WARNING':
            dataSource = data.filter(item => item.status.toUpperCase() === "ĐÔNG ĐÚC");
            break;
        case 'ERROR':
            dataSource = data.filter(item => item.status.toUpperCase() === "KẸT XE");
            break;
        default:
            dataSource = data;
            break;
    }

    return (
        <Table rootClassName='h-full overflow-auto relative' dataSource={dataSource} pagination={false}>
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
                    const upper = status.toUpperCase();
                    let color = upper === 'THÔNG THOÁNG' ? '#52c41a' : upper === 'ĐÔNG ĐÚC' ? '#faad14' : '#ff4d4f';
                    return (
                        <Tag color={color} key={status} className='font-semibold'>
                            {upper}
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
                    <VideoCameraOutlined onClick={() => onClick(id)} />
                )}
            />
        </Table>
    )
}

export default TableStreet;