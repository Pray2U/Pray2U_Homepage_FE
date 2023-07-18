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
    const [itemList, setItemList] = useState(dummyData);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [myPoint, setMyPoint] = useState(1000);
    
    const read_ItemList = async() =>{
        try{
            const url = ''
            const response = await axios.get(url);
            if(response.status === 200){
                setItemList(response.data.content);
            }else{
                // 모달창 띄우기
            }
        }catch(e){
            console.log(e);
        }
    }

    const read_MyPoint = async() =>{
        try{
            const url = ``;
            const response = await axios.get(url);
            if(response.status === 200){
                setMyPoint(response.data.currentPoint);
            }
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
        setSelectedItem(null);
    }

    const openModal = () =>{
        setIsOpenModal(true);
    }

    const isCheckBuy = () =>{
        if(myPoint - selectedItem?.point >= 0){
            return true;
        }else{
            return false;
        }
    }

    const post_BuyItem = async() =>{
        try{
            if(isCheckBuy()){
                
                // const data = {

                // }
                // const url = ``;
                // const response = await axios.post(url,data);
                // if(response.status === 200){
                //     closeModal();
                // }
                closeModal(); //나중에 지우면 됨
            }
        }catch(e){

        }
    }

    useEffect(()=>{
        // read_ItemList();
        // read_MyPoint();
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
                isOpenModal ? <ShopModal 
                    itemInfo={selectedItem} 
                    myPoint={myPoint} 
                    closeModal={closeModal}
                    post_BuyItem={post_BuyItem}
                    /> : <></>
            }
        </div>
    );
}

export default Shoppage;