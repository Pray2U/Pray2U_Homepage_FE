import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../util/auth";

import MyShopItem from "../../components/Shop/MyShopItem";
import MypageHeader from "../../components/Header/MypageHeader";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

import "../../styles/MyPage/MyShop.scss";

const MyShop = () => {
  const navigate = useNavigate();

  const OrderMenu = ["승인 대기", "승인 완료"];

  const [ myOrderList, setMyOrderList ] = useState([]);
  const [ selectedMenu, setSelectedMenu] = useState(0);
  const [ isUsedItem, setIsUsedItem] = useState(false);

  const onClickMenu = (idx) => {
    setSelectedMenu(idx);
    if (idx === 0) {
      setIsUsedItem(false);
    } else {
      setIsUsedItem(true);
    }
  };

  const read_MyOrderItem = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/orders/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyOrderList(response.data.data);
      } else {
        alert("나의 상점 정보를 불러오지 못했습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    read_MyOrderItem();
  }, []);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto">
        <Title title={"Mypage"} />
        <MypageHeader />
        <div className="w-full h-auto m-auto mt-[1rem] mb-[2rem]">
          <div className="flex items-center w-[40%] h-[5vh] text-[1vw] font-bold my-3">
            {OrderMenu?.map((menu, idx) => (
              <div
                className={
                  selectedMenu === idx
                    ? "flex w-[20%] h-[80%] m-auto items-center justify-center border-b-[3px] border-b-solid border-b-[#FFB800] cursor-pointer"
                    : "flex w-[20%] h-[80%] m-auto items-center justify-center cursor-pointer"
                }
                onClick={() => onClickMenu(idx)}
                key={idx}
              >
                {menu}
              </div>
            ))}
          </div>
          <div className="grid w-full h-auto m-auto mt-2 mb-4 grid-cols-3 justify-around items-stretch justify-items-stretch gap-2">
            {
              myOrderList?.map(
              (order) =>
                isUsedItem === order?.useStatus && (
                  <MyShopItem key={order?.orderId} item={order?.item} />
                ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyShop;
