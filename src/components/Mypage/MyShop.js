import { useState, useEffect } from "react";
import axios from "axios";

import '../../styles/MyPage/MyShop.scss';
import MyShopItem from "./MyShopItem";

const MyShop = () =>{

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
    const OrderMenu = [ '사용가능', '사용완료' ]

    const [myOrderList, setMyOrderList] = useState(dummyData);
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isUsedItem, setIsUsedItem] = useState("Pending approval")

    const onClickMenu = (idx) =>{
        setSelectedMenu(idx);
        if(idx){
            setIsUsedItem('Already Approved');
            console.log(isUsedItem);
        }else{
            setIsUsedItem('Pending approval');
        }
    }

    const read_MyOrderItem = async() =>{
        try{
            const url = '/api/orders/me';
            const response = await axios.get(url);
            if(response.status.code === 200){
                setMyOrderList(response.data.orderList);
            }
        }catch(e){

        }
    };

    useEffect(()=>{
        // read_MyOrderItem();
    },[]);

    return(
        <div className="MyItemOrderBox">
            <div className="UsedItemButtons">
                {
                    OrderMenu.map((menu,idx) =>
                        <div 
                            className={selectedMenu === idx ? "SelectedOrderMenu" : "OrderMenu"}
                            onClick={()=>onClickMenu(idx)}
                            key={idx}>{menu}
                        </div>
                    )
                }
            </div>
            <div className="ItemListBox">
                {
                    myOrderList?.map(order => 
                        isUsedItem === order.useStatus &&
                        <MyShopItem key={order.orderId} item={order.item}/>)
                }
            </div>
        </div>
    );
}

export default MyShop;