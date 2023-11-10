import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { getCookie } from "../../util/auth";
import axios from "axios";

import AdminApprovalItem from "./AdminApprovalItem";
import ApprovalModal from "../Modal/ApprovalModal";
import AdminUserItem from "./AdminUserItem";
import Paging from "../Paging";

import '../../styles/Admin/AdminApprovalList.scss';

const AdminApprovalList = () => {

    const navigate = useNavigate();
    const pageSize = 10;
    const [ approvalPageCnt, setApprovalPageCnt ] = useState(1);
    const [ totalItemCnt, setTotalItemCnt ] = useState(null);
    const [ memberInfoList, setMemberInfoList ] = useState([]);
    const [ isApprovalModal, setIsApprovalModal ] = useState(false);

    const read_memberList = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/admin/member-approvals?page=${approvalPageCnt-1}&size=${pageSize}&sort=id,desc`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials: true,
            });
            if(response.status === 200){
                let newMemberList = response.data.data.content;
                setMemberInfoList(newMemberList);
                setTotalItemCnt(response.data.data.totalElements);
            }else{
                alert(response.data.data.msg);
                navigate('/error');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    }

    
    const post_NewUserInfo = async(userName, githubId) =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/admin/member-approvals`;

            const data = {
                username : userName,
                githubId: githubId,
            }
            const response = await axios.post(url,data,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true,
            });
            if(response.status === 200){
                setIsApprovalModal(false);
                let newMember = response.data.data;
                setMemberInfoList(memberInfoList => newMember.concat(memberInfoList));
                alert('유저 승인이 추가 되었습니다.');
            }else{
                setIsApprovalModal(false);
                alert(response.data.data.message);
            }
        }catch(e){
            setIsApprovalModal(false);
            alert(e.response.data.message);
            navigate('/error');
        }
    }

    useEffect(()=>{
        read_memberList();
    },[approvalPageCnt]);

    return(
        <div className="AdminApprovalListContainer">
            <div className="AdminApprovalCreateButton" onClick={()=>setIsApprovalModal(!isApprovalModal)}>승인하기</div>
            <div className="AdminApprovalListHeader">
                <div className="AdminApprovalListName">이름</div>
                <div className="AdminApprovalListCreate">가입일</div>
                <div className="AdminApprovalListStatus">승인 상태</div>
            </div>
            {
                memberInfoList?.map(user =>
                    <AdminApprovalItem key={user?.memberApprovalId} userInfo={user}/>
                )
            }
            <Paging
                pageNum={approvalPageCnt}
                countPerPage={pageSize}
                totalItems={totalItemCnt ? totalItemCnt : 0}
                handlePage={setApprovalPageCnt}
            />
            {
                isApprovalModal ? 
                    <ApprovalModal 
                        closeModal={()=>setIsApprovalModal(false)}
                        post_NewUserInfo={post_NewUserInfo}
                    /> 
                : <></>
            } 
        </div>
    )
}


export default AdminApprovalList;