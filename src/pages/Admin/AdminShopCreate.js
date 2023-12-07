import { useEffect, useState, useRef } from "react";
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
  const imgRef = useRef();

  const [itemName, setItemName] = useState(null);
  const [itemPoint, setItemPoint] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemImg, setItemImg] = useState(null);
  const [previewNewItemImg, setPreviewNewItemImg] = useState(null);

  const onHandleItemName = (e) => {
    setItemName(e.target.value);
  };

  const onHandleItemPoint = (e) => {
    setItemPoint(e.target.value);
  };

  const onHandleItemDescription = (e) => {
    setItemDescription(e.target.value);
  };

  // const onHandleItemImgUrl = (e) => {
  //   if (e.target.files[0]) {
  //     setItemImg(e.target.files[0]);
  //   }
  // };

  const previewImgFile = () => {
    const file = imgRef.current.files[0];
    if (file) {
      setItemImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewNewItemImg(reader.result);
      };
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
        <div className="flex w-full">
          <div className="w-[35%] my-4 h-auto">
            {!previewNewItemImg ? (
              <div
                className="m-auto w-[180px] y-[180px] 2xl:w-[280px] 2xl:h-[280px] xl:w-[220px] xl:h-[220px] border-3 border-solid border-[hsla(220,9%,46%,.3)] mb-3"
                alt="아이템 이미지"
              />
            ) : (
              <img
                className="m-auto w-[180px] y-[180px] 2xl:w-[280px] 2xl:h-[280px] xl:w-[220px] xl:h-[220px] border-3 border-solid border-[hsla(220,9%,46%,.3)] mb-3"
                src={previewNewItemImg}
                alt="아이템 이미지"
              />
            )}

            <input
              type="file"
              id="input-file"
              accept="image/*"
              className="FileUpload"
              style={{ display: "none" }}
              onChange={previewImgFile}
              ref={imgRef}
            />
            <label
              htmlFor="input-file"
              className="flex items-center justify-center m-auto p-[0.25rem] w-[10rem] h-[2.5rem] rounded-[0.375rem] bg-[#6495ED] text-white cursor-pointer hover:bg-[#557DE1]"
            >
              <div>이미지 업로드</div>
            </label>
          </div>
          <div className="w-[65%] my-4 h-auto">
            <div className="w-full m-auto font-bold">
              <p className="mb-[1%]">상품명</p>
              <input
                placeholder="상품명"
                className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-2 text-[1rem] mb-2 focus:border-[#0090F9] focus:outline-none"
                onChange={onHandleItemName}
              />
            </div>
            <div className="w-full m-auto my-2 font-bold">
              <p className="mb-[1%]">상품 포인트</p>
              <input
                placeholder="상품 포인트"
                className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-2 text-[1rem] mb-2 focus:border-[#0090F9] focus:outline-none"
                onChange={onHandleItemPoint}
              />
            </div>
            <div className="w-full m-auto my-2 font-bold">
              <p className="mb-[1%]">상품 설명</p>
              <textarea
                placeholder="상품 설명을 적어주세요."
                className="w-full h-[7rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-2 text-[1rem] mb-2 resize-none focus:border-[#0090F9] focus:outline-none"
                onChange={onHandleItemDescription}
              />
            </div>
          </div>
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
