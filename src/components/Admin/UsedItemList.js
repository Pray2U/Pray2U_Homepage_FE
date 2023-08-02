import axios from "axios";
import { useState } from "react";
import Pagination from 'react-bootstrap/Pagination';

import UserItem from "./UserItem";
import '../../styles/Admin/UserItemList.scss';

const UsedItemList = () =>{

    const dummyData = [
        {
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "1",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "2",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "3",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "4",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "5",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "6",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "7",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Pending approval",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },{
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "8",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Already Approved",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },
        {
            "githubId" : "2",
            "userName" : "2",
            "orderId" : "9",
            "item" : 
                {
                    "itemId": 1,
                    "itemName" : "아이스 아메리카노 교환권",
                    "point":6000,
                    "itemDescription":"아이스 아메리카노 교환권으로 교환 가능합니다.",
                    "imgUrl":"https://jpg.com/iceamericano.jpg"
                },
            "targetUser": "",
            "useStatus":"Already Approved",
            "createDate":"2023-06-31",
            "modifiedDate":"2023-06-31"
        },
    ]

    const [userItmeList, setUserItemList] = useState(dummyData||null);
    const [selectedPage, setSelectedPage] = useState(1);
    const size = 10;

    const onChangePageNum = (num) => {
        setSelectedPage(num);
    }

    const read_UserItemList = async() => {
        try{
            const url = `/api/user/info/all?page=${selectedPage}&size=${size}`;
            const response = await axios.get(url);
            if(response.status.code === 200){
                setUserItemList(response.data.content);
            }
        }catch(e){

        }
    }

    const post_UserItem = async(orderId) =>{
        try{
            // const url = `api/orders/${orderId}`;
            // const data = {

            // }
            // const response = await axios.post(url);
            // if(response.status.code === 200){
            //     setUserItemList(userItmeList => userItmeList.map( userItem =>
            //         userItem.orderId === response.data.orderId ? response.data : userItem
            //     ));
            // }
            setUserItemList(userItmeList => userItmeList.map( userItem =>
                userItem.orderId === orderId ? {...userItem, 
                    useStatus:"Already Approved"} : userItem
            )); // 이거 삭제

        }catch(e){

        }
    }

    return(
        <div className="UserItemListContainer">
            <div className="ButtonBox"/>
            <div className="UserItemListBox">
                <div className="UserItemListTitle">
                    <div className="UserNameTitle">신청자</div>
                    <div className="CreatedTitle">신청날짜</div>
                    <div className="ContentTitle">내용</div>
                    <div className="StatusTitle">상태</div>
                </div>
                {
                    userItmeList?.map(userItem => 
                        <UserItem key={userItem.orderId} userItem={userItem} post_UserItem={post_UserItem}/>
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

export default UsedItemList;