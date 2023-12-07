import "../../styles/Shop/MyShopItem.scss";

const MyShopItem = ({ item }) => {
  return (
    <div className="w-[300px] h-[250px] shadow-[1px_1px_3px_1px_#dadce0] rounded-[1em] font-bold py-[40px]">
      <img
        src={item?.imgUrl}
        className="w-[8rem] h-[8rem] flex justify-center items-center m-auto py-[5px]"
        alt="ItemImg"
      />
      <div className="w-[80%] h-[15%] flex justify-center items-center m-auto py-[5px]">
        {item?.itemName}
      </div>
      <div className="w-[80%] h-[10%] flex justify-center items-center m-auto py-[5px]">
        {item?.point}pt
      </div>
    </div>
  );
};

export default MyShopItem;
