import { useEffect, useState } from "react"
import { getCookie } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Paging from "../Paging";
import AdminUserItem from "./AdminUserItem";

import '../../styles/Admin/AdminUserList.scss';

const AdminUserList = () => {

    const navigate = useNavigate();
    const pageSize = 10;
    const [ pageCnt, setPageCnt ] = useState(1);
    const [ totalItemCnt, setTotalItemCnt ] = useState(null);
    const [ userInfoList, setUserInfoList ] = useState([]);

    const read_userList = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/admin/users?page=${pageCnt-1}&size=${pageSize}&sort=id,desc`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials: true,
            });
            if(response.status === 200){
                let newUserList = response.data.data.content;
                setUserInfoList(newUserList);
                setTotalItemCnt(response.data.data.totalElements);
            }else{
                alert(response.data.msg);
                navigate('/error');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    }
    useEffect(()=>{
        read_userList();
    },[pageCnt]);

    return(
        <div className="AdminUserListContainer">
            <div className="AdminUserListHeader">
                <div className="AdminUserListName">이름</div>
                <div className="AdminUserListEmail">Email</div>
                <div className="AdminUserListCreate">가입일</div>
                <div className="AdminUserListRole">Role</div>
                <div className="AdminUserListSetting">설정</div>
            </div>
            {
                userInfoList?.map(user =>
                    <AdminUserItem key={user?.userId} userInfo={user}/>
                )
            }
            <Paging
                pageNum={pageCnt}
                countPerPage={pageSize}
                totalItems={totalItemCnt ? totalItemCnt : 0}
                handlePage={setPageCnt}
            />
        </div>
    )
}


export default AdminUserList;