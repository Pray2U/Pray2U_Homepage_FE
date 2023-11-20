import "../../styles/Shop/ShopItem.scss";

const ShopItem = ({ item, onModal }) => {
  return (
    <div
      className="w-[300px] h-[15rem] shadow-[1px_1px_3px_1px_#dadce0] rounded-[1em] font-bold m-[10%] cursor-pointer hover:shadow-[1px_1px_3px_1px_#8c8d91]"
      onClick={() => onModal(item?.itemId)}
    >
      <img
        className="w-[9rem] h-[9rem] flex justify-center items-center m-auto mt-4"
        src={item?.imgUrl}
        alt="이미지"
      />
      <div className="w-[80%] h-[15%] flex justify-center items-center m-auto">
        {item?.itemName}
      </div>
      <div className="w-[80%] h-[10%] flex justify-center items-center m-auto">
        {item?.point} pt
      </div>
    </div>
  );
};

export default ShopItem;
