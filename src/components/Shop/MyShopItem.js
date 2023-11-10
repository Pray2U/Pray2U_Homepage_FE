import '../../styles/Shop/MyShopItem.scss';

const MyShopItem = ({item}) => {
    return(
        <div className="MyShopItemBox">
            <img src={item?.imgUrl} className='MyItemTitle' alt="ItemImg"/>
            <div className='MyItemName'>{item?.itemName}</div>
            <div className='MyItemPoint'>{item?.point}pt</div>
        </div>
    );
}

export default MyShopItem;