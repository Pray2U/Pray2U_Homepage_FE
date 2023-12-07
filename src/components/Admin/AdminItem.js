import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import dayjs from "dayjs";

import AdminItemModal from "../Modal/AdminItemModal";
import AdminItemEditModal from "./AdminItemEditModal";

import "../../styles/Admin/AdminItem.scss";

const AdminItem = ({ itemInfo, onRemove, put_ItemInfo }) => {
  const [isModalView, setIsModalView] = useState(false);
  const [isItemEditModal, setIsItemEditModal] = useState(false);

  const onToggle = () => {
    setIsModalView(false);
    setIsItemEditModal(true);
  };

  const onCancel = () => {
    setIsItemEditModal(false);
  };

  return (
    <div className="flex items-center w-full h-[7rem] py-[0.5rem] border-t-[0.1rem] border-t-solid border-t-[#D2D4D9] text-[1.15rem] font-bold">
      <div className="flex items-center w-[25%] mr-[2%]">
        <img
          src={itemInfo?.imgUrl}
          className="w-[4rem] h-[4rem] ml-[0.5rem]"
          alt="상품 이미지"
        />
        <div className="pl-[1rem]">{itemInfo?.itemName}</div>
      </div>
      <div className="w-[15%] pl-[0.5rem]">{itemInfo?.point}</div>
      <div className="w-[20%] pl-[0.5rem]">
        {dayjs(itemInfo?.createdDate).format("YYYY-MM-DD")}
      </div>
      <div className="w-[20%] pl-[0.5rem]">
        {dayjs(itemInfo?.modifiedDate).format("YYYY-MM-DD")}
      </div>
      {isModalView ? (
        <AdminItemModal
          onToggle={() => onToggle()}
          onRemove={() => onRemove(itemInfo?.itemId, itemInfo?.imgUrl)}
        />
      ) : (
        <></>
      )}
      <AiOutlineUnorderedList
        className="ml-auto mr-[1rem] w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-[#6495ED]"
        onClick={() => setIsModalView(!isModalView)}
      />
      {isItemEditModal ? (
        <AdminItemEditModal
          itemInfo={itemInfo}
          onCancel={onCancel}
          put_ItemInfo={put_ItemInfo}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminItem;
