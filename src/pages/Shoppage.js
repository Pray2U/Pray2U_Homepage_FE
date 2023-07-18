import { useState } from "react";

import Header from "../components/Header/Header";

import '../styles/Shop/Shoppage.scss';
import axios from "axios";
import { useEffect } from "react";
import ShopItem from "../components/Shop/ShopItem";
import ShopModal from "../components/Shop/ShopMadal";

const Shoppage  = () =>{

    const dummyData = [
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노9",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "1",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노1",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "2",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노2",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "3",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노3",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "4",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노4",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "5",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노5",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "6",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노6",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "7",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노7",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "8",
            "createDate": "",
            "modifiedDate":"",
        },
        {
            "imgUrl": "이미지",
            "itemName": "아메리카노8",
            "itemDetail": "아메리카노 구매권입니다.",
            "point": "8",
            "createDate": "",
            "modifiedDate":"",
        },
    ]

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [itemList, setItemList] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const myPoint = 1000;
    
    const read_ItemList = async() =>{
        try{
            // const url = ''
            // const response = await axios.get(url);
            // if(response.status === 200){
            //     setItemList(response.data.content);
            // }else{
            //     // 모달창 띄우기
            // }
            setItemList(dummyData);
        }catch(e){
            console.log(e);
        }
    }

    const onModal = (itemName) =>{
        setSelectedItem(itemList?.find(item => item.itemName === itemName));
        openModal();
    }

    const closeModal = () =>{
        setIsOpenModal(false);
    }

    const openModal = () =>{
        setIsOpenModal(true);
    }

    useEffect(()=>{
        read_ItemList();
    },[]);

    return(
        <div className="ShopContainer">
            <Header isLoggedIn={isLoggedIn}/>
            <div className="ShopTitleBox">
                <div className="Title">Shop</div>
                <div className="SubTitle">spend money without regrets</div>
                <div className="MyPoint">현재 내 포인트: {"1000"} pt</div>
            </div>
            <div className="ShopItemListBox">
                {
                    itemList?.map(item => <ShopItem key={item.itemName} item={item} onModal={onModal}/>)
                }
            </div>
            {
                isOpenModal ? <ShopModal itemInfo={selectedItem} myPoint={myPoint} closeModal={closeModal}/> : <></>
            }
        </div>
    );
}

export default Shoppage;