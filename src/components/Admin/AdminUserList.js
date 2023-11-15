import { useEffect, useState } from "react";
import { getCookie } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Paging from "../Paging";
import AdminUserItem from "./AdminUserItem";

import "../../styles/Admin/AdminUserList.scss";

const AdminUserList = () => {
  const navigate = useNavigate();
  const pageSize = 10;
  const [pageCnt, setPageCnt] = useState(1);
  const [totalItemCnt, setTotalItemCnt] = useState(null);
  const [userInfoList, setUserInfoList] = useState([]);

  const read_userList = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/admin/users?page=${
        pageCnt - 1
      }&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        let newUserList = response.data.data.content;
        setUserInfoList(newUserList);
        setTotalItemCnt(response.data.data.totalElements);
      } else {
        alert(response.data.msg);
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };
  useEffect(() => {
    read_userList();
  }, [pageCnt]);

  return (
    <div className="w-full">
      <div className="flex items-center w-full h-[3rem] bg-[#E5E7EB] font-bold text-[rgb(58,57,57)]">
        <div className="w-[20%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[1rem] ml-[3.75rem] mr-[2%]">
          이름
        </div>
        <div className="w-[25%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
          Email
        </div>
        <div className="w-[15%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
          가입일
        </div>
        <div className="w-[15%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
          Role
        </div>
        <div className="ml-auto mr-[1rem]">설정</div>
      </div>
      {userInfoList?.map((user) => (
        <AdminUserItem key={user?.userId} userInfo={user} />
      ))}
      <Paging
        pageNum={pageCnt}
        countPerPage={pageSize}
        totalItems={totalItemCnt ? totalItemCnt : 0}
        handlePage={setPageCnt}
      />
    </div>
  );
};

export default AdminUserList;
