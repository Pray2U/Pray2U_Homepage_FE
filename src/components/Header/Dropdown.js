import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isCheckAdmin } from "../../util/auth";

import "../../styles/Header/Dropdown.scss";

const Dropdown = ({ onHandleLogout, onSetView }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isCheckAdmin());
  }, []);

  return (
    <div className="w-[12rem] absolute z-50 right-0 mt-[320px] mr-8 box-border border-[0.15rem] border-solid border-gray-400 rounded-[0.725rem] bg-white">
      <div className="block py-[0.75rem] px-[2rem] text-[1rem] leading-[0.25rem]">
        <Link
          to={"/mypage/profile"}
          className="py-2 flex items-center w-full h-[20%] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
          onClick={() => onSetView(false)}
        >
          프로필
        </Link>
        <Link
          to={"/mypage/attendance"}
          className="py-2 flex items-center mt-[1rem] w-full h-[20%] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
          onClick={() => onSetView(false)}
        >
          출석
        </Link>
        <Link
          to={"/mypage/mytil"}
          className="py-2 flex items-center mt-[1rem] w-full h-[20%] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
          onClick={() => onSetView(false)}
        >
          My TIL
        </Link>
        <Link
          to={"/mypage/myshop"}
          className="py-2 flex items-center mt-[1rem] w-full h-[20%] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
          onClick={() => onSetView(false)}
        >
          My Shop
        </Link>
        {isAdmin ? (
          <Link
            to={"/admin/user"}
            className="py-2 flex items-center mt-[1rem] w-full h-[20%] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
            onClick={() => onSetView(false)}
          >
            관리자
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div
        className="flex items-center py-[0.75rem] px-[2rem] border-t-[0.1rem] border-t-solid border-t-black text-[1rem] text-slate-950 no-underline cursor-pointer hover:text-[#557DE1] font-nanumgothic font-semibold"
        onClick={onHandleLogout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default Dropdown;
