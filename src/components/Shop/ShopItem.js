import '../../styles/Shop/ShopItem.scss';

const ShopItem = ({item, onModal}) => {
    return(
        <div className="ShopItemBox" onClick={()=>onModal(item?.itemId)}>
            <img className='ItemImage' src={item?.imgUrl} alt='이미지'/>
            <div className='ItemName'>{item?.itemName}</div>
            <div className='ItemPoint'>{item?.point} pt</div>
        </div>
    );
}

export default ShopItem;