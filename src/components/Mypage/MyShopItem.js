
import '../../styles/MyPage/MyShopItem.scss';

const MyShopItem = ({item}) => {
    return(
        <div className="MyShopItemBox">
            <div className='MyItemTitle'>{item?.imgUrl}</div>
            <div className='MyItemName'>{item?.itemName}</div>
            <div className='MyItemPoint'>{item?.point}pt</div>
        </div>
    );
}

export default MyShopItem;