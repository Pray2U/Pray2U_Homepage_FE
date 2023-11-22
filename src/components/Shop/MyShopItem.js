import "../../styles/Shop/MyShopItem.scss";

const MyShopItem = ({ item }) => {
  return (
    <div className="w-[80%] h-[90%] shadow-[1px_1px_3px_1px_#dadce0] rounded-[1em] font-bold m-auto pb-[1.5rem]">
      <img
        src={item?.imgUrl}
        className="w-[8rem] h-[8rem] flex justify-center items-center m-auto"
        alt="ItemImg"
      />
      <div className="w-[80%] h-[15%] flex justify-center items-center m-auto">
        {item?.itemName}
      </div>
      <div className="w-[80%] h-[10%] flex justify-center items-center m-auto">
        {item?.point}pt
      </div>
    </div>
  );
};

export default MyShopItem;
