import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

import Footer from "../../components/Footer";
import RegistButton from "../../components/RegistButton";
import Title from "../../components/Title/Title";

import "../../styles/Admin/AdminShopCreate.scss";
import { getCookie, isCheckAdmin } from "../../util/auth";
import { uploadFile } from "../../util/s3Upload";

const AdminShopCreate = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState(null);
  const [itemPoint, setItemPoint] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemImg, setItemImg] = useState(null);

  const onHandleItemName = (e) => {
    setItemName(e.target.value);
  };

  const onHandleItemPoint = (e) => {
    setItemPoint(e.target.value);
  };

  const onHandleItemDescription = (e) => {
    setItemDescription(e.target.value);
  };

  const onHandleItemImgUrl = (e) => {
    if (e.target.files[0]) {
      setItemImg(e.target.files[0]);
    }
  };

  const onHandleCancel = () => {
    navigate("/admin/shop");
  };

  const onHandleDeleteFile = () => {
    setItemImg(null);
  };

  const post_ItemInfo = async () => {
    try {
      if (itemName && itemImg && itemPoint && itemDescription) {
        const imgUrl = await uploadFile(itemImg);
        console.log(imgUrl);
        if (imgUrl) {
          const postData = {
            imgUrl: imgUrl,
            itemDescription: itemDescription,
            itemName: itemName,
            point: parseInt(itemPoint),
          };
          const url = `${process.env.REACT_APP_API_SERVER}/api/admin/items`;
          const response = await axios.post(url, postData, {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
            withCredentials: true,
          });
          if (response.status === 200) {
            alert("상품이 등록되었습니다.");
            navigate("/admin/shop");
          } else {
            alert("등록 오류입니다.");
            navigate("/admin/shop");
          }
        }
      } else {
        alert("입력이 제대로 되지 않았습다.");
      }
    } catch (e) {
      alert(e);
      navigate("/error");
    }
  };

  useEffect(() => {
    const isAdmin = isCheckAdmin();
    if (!isAdmin) {
      navigate("/error");
    }
  }, []);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mb-[2rem]">
        <Title title={"아이템 등록"} />
        <div className="w-full m-auto mt-[1rem] mb-[1rem] font-bold">
          <p className="mb-[1%]">상품명</p>
          <input
            placeholder="상품명"
            className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] mb-[1%] focus:border-[#0090F9] focus:outline-none"
            onChange={onHandleItemName}
          />
        </div>
        <div className="w-full m-auto mt-[1rem] mb-[1rem] font-bold">
          <p className="mb-[1%]">상품 포인트</p>
          <input
            placeholder="상품 포인트"
            className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] mb-[1%] focus:border-[#0090F9] focus:outline-none"
            onChange={onHandleItemPoint}
          />
        </div>
        <div className="w-full m-auto mt-[1rem] mb-[1rem] font-bold">
          <p className="mb-[1%]">상품 설명</p>
          <textarea
            placeholder="상품 설명을 적어주세요."
            className="w-full h-[7rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] mb-[1%] resize-none focus:border-[#0090F9] focus:outline-none"
            onChange={onHandleItemDescription}
          />
        </div>
        <div className="mb-[1rem] w-full h-auto">
          <input
            type="file"
            id="input-file"
            accept="image/*"
            className="FileUpload"
            style={{ display: "none" }}
            onChange={onHandleItemImgUrl}
          />
          <label
            htmlFor="input-file"
            className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#0090F9] text-white cursor-pointer hover:bg-[#0B7FD3]"
          >
            <div className="FileUpload">파일 업로드</div>
          </label>
          {itemImg?.name ? (
            <div className="flex items-center w-full h-[3rem] mt-[0.5rem]">
              <div className="flex items-center border-[0.1rem] border-solid border-[rgb(120, 117, 117)] rounded-[5rem] mr-[1rem] h-[80%]">
                <div className="flex items-center whitespace-nowrap pl-[1rem] text-[1rem] h-[80%]">
                  {itemImg?.name}
                </div>
                <MdOutlineCancel
                  className="flex items-center w-[1.5rem] h-[1.5rem] mx-[1.5rem] cursor-pointer text-gray-500"
                  onClick={() => onHandleDeleteFile()}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <RegistButton
          onHandleCancel={onHandleCancel}
          onHandleSave={post_ItemInfo}
        />
      </div>
      <Footer />
    </>
  );
};

export default AdminShopCreate;
