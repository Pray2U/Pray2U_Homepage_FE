import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, isCheckAdmin } from "../../util/auth";
import axios from "axios";

import AdminSideMenu from "../../components/Admin/AdminSideMenu";
import AdminOrderItem from "../../components/Admin/AdminOrderItem";
import Footer from "../../components/Footer";
import Title from "../../components/Title/Title";
import Paging from "../../components/Paging";

import "../../styles/Admin/AdminOrder.scss";

const AdminOrder = () => {
  const pageSize = 10;
  const navigate = useNavigate();

  const [pageCnt, setPageCnt] = useState(1);
  const [totalItemCnt, setTotalItemCnt] = useState(2);
  const [orderList, setOrderList] = useState([]);

  const read_OrderList = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/admin/orders?page=${
        pageCnt - 1
      }&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        let newOrderList = response.data.data;
        setOrderList(newOrderList);
        setTotalItemCnt(newOrderList?.length);
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

  const post_OrderApproval = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/admin/orders/${id}/accept`;
      const response = await axios.put(url, null, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("주문 승인이 완료되었습니다.");
        let newOrder = response.data.data;
        setOrderList((orderList) =>
          orderList.map((order) => (order?.orderId === id ? newOrder : order))
        );
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  useEffect(() => {
    const isAdmin = isCheckAdmin();
    if (!isAdmin) {
      navigate("/error");
    }
    read_OrderList();
  }, [pageCnt]);

  return (
    <>
      <div className="w-[1280px] h-auto m-auto mb-2">
        <Title title={"주문 관리"} />
        <div className="flex w-full pt-[3rem]">
          <AdminSideMenu />
          <div className="w-[80%]">
            <div className="flex items-center w-full h-[3rem] bg-[#E5E7EB] font-bold text-[rgb(58,57,57)]">
              <div className="w-[20%] pl-[1rem] mr-[2%]">신청자</div>
              <div className="w-[25%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                주문 날짜
              </div>
              <div className="w-[25%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                주문 상품
              </div>
              <div className="flex justify-center w-[30%] border-l-[0.1rem] border-l-solid border-l-[rgb(179,176,176)] pl-[0.5rem]">
                승인 여부
              </div>
            </div>
            {orderList?.map((order) => (
              <AdminOrderItem
                key={order?.orderId}
                orderInfo={order}
                onToggle={post_OrderApproval}
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

export default AdminOrder;
