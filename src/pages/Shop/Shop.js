import { useEffect, useState } from "react";
import axios from "axios";

import Title from "../../components/Title/Title";
import ShopItem from "../../components/Shop/ShopItem";
import ShopModal from "../../components/Shop/ShopModal";
import Footer from "../../components/Footer";

import "../../styles/Shop/Shop.scss";
import { getCookie } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [myPoint, setMyPoint] = useState(null);
  const [rerender, setRerender] = useState(false);

  const read_ItemList = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/items`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setItemList(response.data.data);
      } else {
        alert("데이터 통신에 실패했습니다.");
        navigate("/error");
      }
    } catch (e) {
      // alert(e.response.data.message);
      alert(e.message);
      navigate("/error");
    }
  };

  const read_MyPoint = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/points/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyPoint(response.data.data.currentPoint);
      } else {
        alert("내 포인트를 가져오는데 실패했습니다.");
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onModal = (id) => {
    setSelectedItem(itemList?.find((item) => item?.itemId === id));
    openModal();
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedItem(null);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const isCheckBuy = () => {
    if (myPoint - selectedItem?.point >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const post_BuyItem = async (itemId) => {
    try {
      if (isCheckBuy()) {
        const url = `${process.env.REACT_APP_API_SERVER}/api/items/${itemId}/orders`;
        const response = await axios.post(url, null, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          setRerender(!rerender);
          alert("구매가 완료되었습니다.");
        } else {
          alert(response.data.message);
        }
        closeModal();
      } else {
        alert("포인트가 부족하여 구매할 수 없습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    read_ItemList();
    read_MyPoint();
  }, [rerender]);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto pb-8">
        <Title title="Shop" />
        <div className="flex items-center justify-end w-full h-24 m-auto my-[2rem] font-bold text-[1.5rem]">
          현재 보유 포인트: {myPoint}
        </div>
        <div className="grid w-full items-stretch justify-items-stretch m-auto rounded-[0.5rem] bg-white shadow-[1px_1px_3px_1px_#c7c9cb] grid-cols-3 justify-around">
          {itemList?.map((item) => (
            <ShopItem key={item?.itemId} item={item} onModal={onModal} />
          ))}
          {itemList.length === 0 && (
            <div className="w-full h-[300px] bg-gray-100 flex justify-center items-center">
              <div className="font-bold text-2xl">
                😮상품이 존재하지 않습니다😮
              </div>
            </div>
          )}
        </div>
        {isOpenModal ? (
          <ShopModal
            itemInfo={selectedItem}
            myPoint={myPoint}
            closeModal={closeModal}
            post_BuyItem={post_BuyItem}
          />
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
