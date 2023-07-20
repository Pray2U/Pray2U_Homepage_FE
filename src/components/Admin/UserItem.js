
import '../../styles/Admin/UserItem.scss';

const UserItem = ({userItem, post_UserItem}) =>{
    return(
        <div className="UserItemBox">
            <div className="UserItemUserName">{userItem?.userName}</div>
            <div className="UserItemCreated">{userItem?.createDate}</div>
            <div className="UserItemItemName">{userItem?.item.itemName}</div>
            {
                userItem?.useStatus === "Pending approval" ? 
                <div className="UserItemStatus" onClick={()=>post_UserItem(userItem.orderId)}>사용승인</div> : 
                <div className="UserItemUsedStatus">사용완료</div>
            }
        </div>
    );
}

export default UserItem;
