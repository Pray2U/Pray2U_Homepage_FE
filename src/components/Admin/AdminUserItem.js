import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { AiOutlineSetting } from "react-icons/ai";

import AdminUserModal from "../Modal/AdminUserModal";

import "../../styles/Admin/AdminUserItem.scss";

const AdminUserItem = ({ userInfo, post_userRole }) => {
  const [isModalView, setIsModalView] = useState(false);

  // const post_userRole = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_SERVER}/api/users/roles/${userInfo?.userId}`;
  //     const data = {
  //       role: userInfo?.role === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN",
  //     };
  //     const response = await axios.post(url, data, {
  //       headers: {
  //         Authorization: `Bearer ${getCookie("accessToken")}`,
  //       },
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       setUserRole(response.data.data.role);
  //       alert("직책이 변경되었습니다.");
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (e) {
  //     alert(e.response.data.message);
  //   }
  // };

  return (
    <div className="flex items-center w-full py-[0.5rem] border-t-[0.1rem] border-t-solid border-t-[#D2D4D9]">
      <img
        src={userInfo?.profileImgUrl}
        alt="Profile"
        className="w-[3rem] h-[3rem] rounded-[50%] border-[0.1rem] border-solid border-[#a3a4a6]"
      />
      <div className="ml-[0.75rem] mr-[2%] w-[20%] pl-[0.5rem]">
        <Link
          to={`https://github.com/${userInfo?.githubId}`}
          target="_blank"
          className="text-[1.1rem] h-[60%] mb-[0.5rem] text-[#0090F9]"
        >
          {userInfo?.username}
        </Link>
        <p className="h-[40%] m-0">{userInfo?.githubId}</p>
      </div>
      <div className="w-[25%] text-[1.1rem] pl-[0.5rem]">{userInfo?.email}</div>
      <div className="w-[15%] text-[1.1rem] pl-[0.5rem]">
        {dayjs(userInfo?.createdDate).format("YYYY-MM-DD")}
      </div>
      <div className="w-[15%] text-[1.1rem] pl-[0.5rem]">{userInfo?.role}</div>
      {isModalView ? (
        <AdminUserModal
          onToggle={() => post_userRole(userInfo?.userId, userInfo?.role)}
          userrole={userInfo?.role}
        />
      ) : (
        <></>
      )}
      <AiOutlineSetting
        className="ml-auto mr-[1rem] w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-[#0090F9]"
        onClick={() => setIsModalView(!isModalView)}
      />
    </div>
  );
};

export default AdminUserItem;
