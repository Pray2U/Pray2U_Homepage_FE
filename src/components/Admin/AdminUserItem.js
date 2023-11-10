import dayjs from "dayjs";

import '../../styles/Admin/AdminUserItem.scss';
import { Link } from "react-router-dom";
import { AiOutlineSetting } from 'react-icons/ai'
import { useState } from "react";
import AdminUserModal from "../Modal/AdminUserModal";
import axios from "axios";
import { getCookie }from "../../util/auth";


const AdminUserItem = ({userInfo}) => {

    const [ isModalView, setIsModalView ] = useState(false);
    const [ userRole, setUserRole ] = useState(userInfo?.role);

    const post_userRole = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/users/roles/${userInfo?.githubId}`;
            const data = {
                role: (userInfo?.role === "ROLE_ADMIN") ? "ROLE_USER" : "ROLE_ADMIN",
            };
            const response = await axios.post(url,data,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setUserRole(response.data.data.role);
                alert("직책이 변경되었습니다.");
            }else{
                alert(response.data.message);
            }
        }catch(e){
            alert(e.response.data.message);
        }
    }

    return(
        <div className="AdminUserItemContainer">
            <img src={userInfo?.profileImgUrl} alt="Profile" className="UserProfile"/>
            <div className="AdminUserItemName">
                <Link to={`https://github.com/${userInfo?.githubId}`} target="_blank" className="AdminUserItemUserName">{userInfo?.username}</Link>
                <p className="AdminUserItemGithubName">{userInfo?.githubId}</p>
            </div>
            <div className="UserEmail">{userInfo?.email}</div>
            <div className="UserCreateDate">{dayjs(userInfo?.createdDate).format('YYYY-MM-DD')}</div>
            <div className="UserRole">{userRole}</div>
            {
                isModalView ? <AdminUserModal onToggle={post_userRole}/>  : <></>
            }
            <AiOutlineSetting className="UserSetting" onClick={()=>setIsModalView(!isModalView)}/>
            
        </div>
    );
}

export default AdminUserItem;