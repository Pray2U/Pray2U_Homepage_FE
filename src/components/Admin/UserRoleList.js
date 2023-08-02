import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';

import UserRole from "./UserRole";

import '../../styles/Admin/UserRoleList.scss';

const UserRoleList = () => {

    const dummyData = [
        {
			"userId" : 1,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "Member",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 2,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 3,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 4,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 5,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 6,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 7,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 8,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 9,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
        {
			"userId" : 10,
	        "githubId": "gildong Hong",
	        "userName": "gildong",
	        "profileImgUrl": "gildongImgCloud.com/gildongHong.jpg",
	        "phoneNumber": "010-0000-0001",
	        "Email": "gildong@gmail.com",
	        "Role": "ADMIN",
	        "createDate": "2023-06-30",
			"modifiedDate": "2023-07-01"
	    },
    ]

    const [userRoleList, setUserRoleList] = useState(dummyData);
    const [selectedPage, setSelectedPage] = useState(1);
    const size = 10;

    const onChangePageNum = (num) => {
        setSelectedPage(num);
    }

    const post_UserRole = async(user) =>{
        try{
            // const url = `api/orders/${orderId}`;
            // const data = {
            //      userId: ??
            //      Role: {user.Role === "Admin" ? "Member" : "Admin"}
            // }
            // const response = await axios.post(data,url);
            // if(response.status.code === 200){
            //     setUserRoleList(userRoleList => userRoleList.filter(userInfo =>
            //         userInfo.userId === response.data.userId ? response.data : userInfo
            //     ));
            // }
        }catch(e){

        }
    }

    
    const read_UserList = async() => {
        try{
            const url = `/api/user/info/all?page=${selectedPage}&size=${size}`;
            const response = await axios.get(url);
            if(response.status.code === 200){
                setUserRoleList(response.data.content);
            }
        }catch(e){

        }
    }

    useEffect(()=>{
        // read_UserList();
    },[])

    return(
        <div className="UserRoleListContainer">
            <div className="ButtonBox"/>
            <div className="UserRoleListBox">
                <div className="UserRoleListTitle">
                    <div className="UserName">이름</div>
                    <div className="UserCreated">가입 날짜</div>
                    <div className="UserGithubId">Github Account</div>
                    <div className="UserRole">직책</div>
                    <div className="UserRoleEdit">직책 변경</div>
                </div>
                {
                    userRoleList?.map(user => 
                        <UserRole key={user.userId} userInfo={user} post_UserRole={post_UserRole}/>
                    )
                }
            </div>
            <Pagination className='UserPaginationBox'>
                <Pagination.Prev/>
                {
                    [1,2,3,4,5].map(pageNum =>
                    selectedPage === pageNum ?
                    <Pagination.Item 
                        key={pageNum} 
                        active={true}>
                        {pageNum}
                    </Pagination.Item> :
                    <Pagination.Item 
                        key={pageNum} 
                        active={false}
						onClick={()=>onChangePageNum(pageNum)}>
                        {pageNum}
                    </Pagination.Item>
                    )
                }
                <Pagination.Next/>
            </Pagination>
        </div>
    );
}

export default UserRoleList;