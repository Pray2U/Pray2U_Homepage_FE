import axios from "axios";
import { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import Pagination from 'react-bootstrap/Pagination';

import UserInfo from "./UserInfo";
import UserCreateModal from "./UserCreateModal";

import '../../styles/Admin/UserCreate.scss';

const UserCreate = () => {

    const dummyData = [
        {
			"userId" : 1,
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

    const [userList, setUserList] = useState(dummyData);
    const [selectedPage, setSelectedPage] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const size = 10;
    
    const openUserCreateModal = () =>{
        setIsOpenModal(true);
    }
	
    const closeUserCreateModal = () =>{
        setIsOpenModal(false);
    }

    const onChangePageNum = (num) => {
        setSelectedPage(num);
    }

    
    const read_UserList = async() => {
        try{
            const url = `/api/user/info/all?page=${selectedPage}&size=${size}`;
            const response = await axios.get(url);
            if(response.status.code === 200){
                setUserList(response.data.content);
            }
        }catch(e){

        }
    }

    useEffect(()=>{
        // read_UserList();
    },[])

    return(
        <div className="UserListContainer">
            <div className="ButtonBox">
                <AiFillPlusSquare className="CreateButton" onClick={()=>openUserCreateModal()}/>
            </div>
            <div className="UserListBox">
                <div className="UserListTitle">
                    <div className="UserName">이름</div>
                    <div className="UserCreated">가입 날짜</div>
                    <div className="UserEmail">E-mail</div>
                    <div className="UserGithubId">Github ID</div>
                </div>
                {
                    userList?.map(user => 
                        <UserInfo key={user.userId} userInfo={user}/>
                    )
                }
            </div>
            {
                isOpenModal && <UserCreateModal closeModal={closeUserCreateModal}/>
            }
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

export default UserCreate;