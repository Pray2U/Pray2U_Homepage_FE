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
      <div className="w-[30%] pl-[0.5rem] text-white">
        {!orderInfo?.useStatus ? (
          <div
            className="flex justify-center m-auto w-[50%] pl-[0.5rem] bg-green rounded-[0.5rem] cursor-pointer hover:bg-red"
            onClick={() => onToggle(orderInfo?.orderId)}
          >
            승인 대기
          </div>
        ) : (
          <div className="flex justify-center m-auto w-[50%] pl-[0.5rem] bg-gray rounded-[0.5rem] text-white">
            승인 완료
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderItem;
