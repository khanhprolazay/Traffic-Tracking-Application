import { Table, Tag, Typography } from 'antd';
const { Column } = Table;
import { VideoCameraOutlined } from '@ant-design/icons'
import ColumnGroup from 'antd/es/table/ColumnGroup';
import data from "../mock/data.street.mock.json";
import { STATUS } from "../constant"

const TableStreet = ({ status, onItemClick }) => {
    const dataFilter = status ? data.filter(item => item.status === status) : data;
    // console.log(status, dataFilter)

    return (
        <Table rootClassName='h-full overflow-auto relative' dataSource={dataFilter} pagination={false}>
            <Column title={<Typography className='text-center text-xs font-normal'>Thành phố</Typography>} dataIndex="city" key="city" className='text-xs' width={125} />
            <Column title={<Typography className='text-center text-xs font-normal'>Tuyến đường</Typography>} dataIndex="street" key="street" className='text-xs' width={175} />
            <ColumnGroup title="Số lượng xe lưu thông" className='text-xs !font-normal w-[30%]' >
                <Column align='center' title="Xe 2 bánh" dataIndex="bike" key="bike" width={65} className='text-xs !font-normal' />
                <Column align='center' title="Xe 4 bánh trở lên" dataIndex="oto" key="oto" width={65} className='text-xs !font-normal' />
            </ColumnGroup>
            <Column
                align='center'
                width={100}
                className='text-sm'
                title={<Typography className='text-center text-xs font-normal'>Tình trạng</Typography>}
                dataIndex="status"
                key="status"
                render={(status) => {
                    let color = status === 2 ? '#52c41a' : status === 1 ? '#faad14' : '#ff4d4f';
                    return (
                        <Tag color={color} key={status} className='font-semibold'>
                            {STATUS[status]}
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
                    <VideoCameraOutlined onClick={() => onItemClick(id)} />
                )}
            />
        </Table>
    )
}

export default TableStreet;