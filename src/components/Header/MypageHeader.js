import { Link, useLocation } from "react-router-dom";

import "../../styles/Header/MypageHeader.scss";

const MypageHeader = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const currentPath = path[path.length - 1];

  const userHeaders = [
    {
      link: "profile",
      title: "프로필",
    },
    {
      link: "attendance",
      title: "출석관리",
    },
    {
      link: "mytil",
      title: "My TIL",
    },
    {
      link: "myshop",
      title: "My Shop",
    },
  ];

  return (
    <div className="flex items-center justify-center m-auto mt-2 w-full h-[3.5rem] border-b-[0.15em] border-b-solid border-b-[#BABABA] border-t-[0.15em] border-t-solid border-t-[#BABABA] font-bold">
      {userHeaders.map((menu) => (
        <Link
          to={`/mypage/${menu?.link}`}
          key={menu?.link}
          className={
            menu?.link === currentPath
              ? "flex w-[15%] h-[90%] justify-center items-center text-[1.125vw] text-[#0090F9] cursor-pointer no-underline hover:text-[#0090F9]"
              : "flex w-[15%] h-[90%] justify-center items-center text-[1.125vw] cursor-pointer no-underline text-inherit hover:text-[#0090F9]"
          }
        >
          {menu?.title}
        </Link>
      ))}
    </div>
  );
};

export default MypageHeader;
