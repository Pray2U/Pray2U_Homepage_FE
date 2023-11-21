import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, isCheckAdmin } from "../../util/auth";
import axios from "axios";

import AdminSideMenu from "../../components/Admin/AdminSideMenu";
import Footer from "../../components/Footer";
import Title from "../../components/Title/Title";
import AdminItem from "../../components/Admin/AdminItem";
import Paging from "../../components/Paging";

import "../../styles/Admin/AdminShop.scss";

const AdminShop = () => {

  const navigate = useNavigate();
  const pageSize = 10;
  const [pageCnt, setPageCnt] = useState(1);
  const [totalItemCnt, setTotalItemCnt] = useState(2);
  const [shopItemList, setShopItemlist] = useState([]);

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
        let newItemList = response.data.data;
        setShopItemlist(newItemList);
        setTotalItemCnt(newItemList?.length);
        // setTotalItemCnt(response.data.data.totalElements);
      } else {
        alert(response.data.msg);
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onRemove = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/admin/items/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("상품이 삭제되었습니다.");
        setShopItemlist((shopItemList) =>
          shopItemList.filter((item) => item.itemId !== id)
        );
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onToggle = () => {
    navigate("/admin/item/create");
  };

  useEffect(() => {
    read_ItemList();
    if (!isCheckAdmin()) {
      navigate("/error");
    }
  }, [pageCnt]);

  return (
    <>
      <div className="w-[1280px] h-auto m-auto mb-2">
        <Title title={"아이템 관리"} />
        <div className="flex w-full pt-[3rem]">
          <AdminSideMenu />
          <div className="w-[80%]">
            <div
              className="flex items-center justify-center w-[6rem] h-[2.5rem] text-white font-bold bg-[#0090F9] rounded-[0.5rem] ml-auto mb-[2rem] cursor-pointer hover:bg-[#0B7FD3]"
              onClick={() => navigate("/admin/shop/create")}
            >
              상품 등록
            </div>
            <div className="flex items-center w-full h-[3rem] bg-[#E5E7EB] font-bold text-[rgb(58,57,57)]">
              <div className="w-[20%] pl-[1rem] mr-[2%]">상품명</div>
              <div className="w-[15%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                가격
              </div>
              <div className="w-[20%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                등록일
              </div>
              <div className="w-[25%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                수정일
              </div>
              <div className="ml-auto mr-[1rem]">설정</div>
            </div>
            {shopItemList?.map((shopItem) => (
              <AdminItem
                key={shopItem?.itemId}
                itemInfo={shopItem}
                onRemove={onRemove}
                onToggle={onToggle}
              />
            ))}
            <Paging
              pageNum={pageCnt}
              countPerPage={pageSize}
              totalItems={totalItemCnt ? totalItemCnt : 0}
              handlePage={setPageCnt}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminShop;
