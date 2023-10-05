
import '../../styles/Shop/ShopItem.scss';

const ShopItem = ({item, onModal}) => {
    return(
        <div className="ShopItemBox" onClick={()=>onModal(item?.itemName)}>
            <div className='ItemTitle'>{item?.imgUrl}</div>
            <div className='ItemName'>{item?.itemName}</div>
            <div className='ItemPoint'>{item?.point}pt</div>
        </div>
    );
}

export default ShopItem;