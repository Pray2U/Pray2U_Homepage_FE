import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineTeam,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
} from "react-icons/ai";

import "../../styles/Admin/AdminSideMenu.scss";

const AdminSideMenu = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const currentPath = path[path.length - 1];

  const AdminSideMenuLists = [
    {
      link: "user",
      title: "유저 관리",
      icon: (
        <AiOutlineTeam className="flex items-center w-[1.5rem] h-[1.5rem]" />
      ),
    },
    {
      link: "shop",
      title: "아이템 관리",
      icon: (
        <AiOutlineUnorderedList className="flex items-center w-[1.5rem] h-[1.5rem]" />
      ),
    },
    {
      link: "order",
      title: "주문 승인",
      icon: (
        <AiOutlineShoppingCart className="flex items-center w-[1.5rem] h-[1.5rem]" />
      ),
    },
  ];

  return (
    <div className="w-[15%] h-full mr-[5%]">
      <div className="m-auto text-[1.25rem] font-bold mt-[2rem] mb-[2rem]">
        관리자 메뉴
      </div>
      {AdminSideMenuLists.map((menu) => (
        <Link
          to={`/admin/${menu?.link}`}
          key={menu?.link}
          className={
            menu?.link === currentPath
              ? "flex py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.5rem] bg-[#E5E7E8] no-underline cursor-pointer text-[#0090F9] hover:no-underline"
              : "flex py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.5rem] bg-white no-underline text-black cursor-pointer text-gray hover:underline bg-[#E5E7E8] text-black"
          }
        >
          {menu?.icon}
          <div className="pl-[1rem] font-bold">{menu?.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSideMenu;
