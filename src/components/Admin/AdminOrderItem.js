import dayjs from "dayjs";
import "../../styles/Admin/AdminOrderItem.scss";

const AdminOrderItem = ({ orderInfo, onToggle }) => {
  return (
    <div className="flex items-center w-full py-[0.5rem] border-t-[0.1rem] border-t-solid border-t-[#D2D4D9] text-[1.12rem] font-bold">
      <div className="w-[20%] pl-[1rem] mr-[2%]">
        {orderInfo?.user?.writerName}
      </div>
      <div className="w-[25%] pl-[0.5rem]">
        {dayjs(orderInfo?.createDate).format("YYYY.MM.DD HH:mm")}
      </div>
      <div className="w-[25%] pl-[0.5rem]">{orderInfo?.item?.itemName}</div>
      <div className="w-[30%] pl-[0.5rem] text-black">
        {!orderInfo?.useStatus ? (
          <div className="flex justify-center items-center m-auto w-full pl-[0.5rem] rounded-[0.5rem]">
            <p className="m-0 p-3">승인 대기</p>
            <button
              className="w-16 h-8 bg-gray-400 hover:bg-red-500 rounded-md"
              onClick={() => onToggle(orderInfo?.orderId)}
            >
              ✓
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center m-auto w-full pl-[0.5rem] rounded-[0.5rem]">
            <p className="m-0 p-3">승인 완료 ✅</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderItem;
