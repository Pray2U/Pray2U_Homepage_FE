
import dayjs from 'dayjs';
import '../../styles/Admin/AdminOrderItem.scss';

const AdminOrderItem = ({orderInfo, onToggle}) => {
    return(
        <div className="AdminOrderItemContainer">
            <div className='AdminOrderItemUserName'>{orderInfo?.user?.writerName}</div>
            <div className='AdminOrderItemCreate'>{dayjs(orderInfo?.createDate).format('YYYY.MM.DD HH:mm')}</div>
            <div className='AdminOrderItemName'>{orderInfo?.item?.itemName}</div>
            <div className='AdminOrderItemStatusBox'>
                {
                    !orderInfo?.useStatus ? 
                    <div className='AdminOrderItemStatus' onClick={()=>onToggle(orderInfo?.orderId)}>승인 대기</div>
                    : <div className='AdminOrderItemUsedStatus'>승인 완료</div>
                }
            </div>
        </div>
    );
}

export default AdminOrderItem;