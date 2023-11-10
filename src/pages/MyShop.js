import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../util/auth";

import MyShopItem from "../components/Shop/MyShopItem";
import MypageHeader from "../components/Header/MypageHeader";
import Title from "../components/Title/Title";
import Footer from "../components/Footer";

import '../styles/MyPage/MyShop.scss';

const MyShop = () =>{  

    const navigate = useNavigate();

    const OrderMenu = [ '승인 대기', '승인 완료' ]

    const [ myOrderList, setMyOrderList ] = useState([]);
    const [ selectedMenu, setSelectedMenu ] = useState(0);
    const [ isUsedItem, setIsUsedItem ] = useState(false);

    const onClickMenu = (idx) =>{
        setSelectedMenu(idx);
        if(idx){
            setIsUsedItem(false);
        }else{
            setIsUsedItem(true);
        }
    }

    const read_MyOrderItem = async() =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/orders/me`;
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true,
            });
            if(response.status === 200){
                setMyOrderList(response.data.data);
            }else{
                alert('나의 상점 정보를 불러오지 못했습니다.');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    };

    useEffect(()=>{
        read_MyOrderItem();
    },[]);

    return(
        <>
            <div className="MyShopContainer">
                <Title title={'Mypage'}/>
                <MypageHeader/>
                <div className="MyItemOrderBox">
                    <div className="UsedItemButtons">
                        {
                            OrderMenu?.map((menu,idx) =>
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
                                isUsedItem === order?.useStatus &&
                                <MyShopItem key={order?.orderId} item={order?.item}/>)
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyShop;