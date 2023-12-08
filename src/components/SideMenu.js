import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import "../styles/SideMenu/SideMenu.scss";

const SideMenu = ({ onToggle, onRemove, isMyPost }) => {
  const [isMenuModal, setIsMenuModal] = useState(false);

  return (
    <div className="SideMenuContainer">
      {/* <BsThreeDotsVertical className='SideMenuIcon' onClick={()=>setIsMenuModal(!isMenuModal)}/> */}
      {isMenuModal ? (
        <div className="flex">
          {isMyPost && (
            <div
              className="border-2 border-solid border-[#6495ED] w-[65px] h-[40px] rounded-lg flex justify-center items-center mr-2 hover:bg-[#6495ED] hover:text-white"
              onClick={onToggle}
            >
              <div className="font-jua font-normal">수정</div>
            </div>
          )}
          <div
            className="border-2 border-solid border-red-500 w-[65px] h-[40px] rounded-lg flex justify-center items-center hover:bg-red-500 hover:text-white"
            onClick={onRemove}
          >
            <div className="font-jua font-normal">삭제</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <AiOutlineMenu
        className="SideMenuIcon ml-6"
        onClick={() => setIsMenuModal(!isMenuModal)}
      />
    </div>
  );
};

export default SideMenu;
