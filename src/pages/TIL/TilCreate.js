import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { getCookie } from "../../util/auth";

import TextEditor from "../../components/TextEditor";
import RegistButton from "../../components/RegistButton";
import Footer from "../../components/Footer";
import Title from "../../components/Title/Title";

import "../../styles/Til/TilCreate.scss";

const TilCreate = () => {
  const navigate = useNavigate();
  const initContent = `<h3>${dayjs(new Date()).format(
    "YYYY-MM-DD"
  )} TIL</h3><ul><li>학습 내용<ul><li>내용</li></ul></li><li>링크<ul><li>링크</li></ul></li></ul>`;

  const [title, setTitle] = useState(null);
  const [tag, setTag] = useState(null);
  const [content, setContent] = useState(initContent);

  const onHandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const onHandleTag = (e) => {
    setTag(e.target.value);
  };

  const onHandleCancel = () => {
    navigate("/til");
  };

  const post_TilInfo = async () => {
    if (title && tag && content) {
      try {
        const postData = {
          title: title,
          tag: tag,
          content: content,
        };
        const url = `${process.env.REACT_APP_API_SERVER}/api/tils`;
        const response = await axios.post(url, postData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          alert(
            `TIL이 등록되었습니다. ${response.data.data.point}포인트를 얻었습니다.`
          );
          navigate("/til");
        } else {
          alert("등록 실패하셨습니다.");
          navigate("/til");
        }
      } catch (e) {
        if (e.response.data.errors) {
          alert(e.response.data.errors[0].message);
        } else {
          alert(e.response.data.message);
        }
        navigate("/til");
      }
    } else {
      alert("제목 혹은 내용을 채워주세요");
    }
  };

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-[2%] mb-[1%]">
        <Title title={"TIL 작성"} />
        <div className=" mt-[2rem]">
          <p className="mb-[1%] font-nanumgothic font-semibold">제목</p>
          <input
            placeholder="제목을 입력해주세요."
            className="w-[98.5%] h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] focus:border-[#6495ED] outline-none"
            onChange={onHandleTitle}
          />
        </div>
        <div className="mt-[1rem]">
          <p className="mb-[1%] font-nanumgothic font-semibold">태그</p>
          <input
            placeholder="태그를 입력해주세요. (예: java, react)"
            className="w-[98.5%] h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] focus:border-[#6495ED] outline-none"
            onChange={onHandleTag}
          />
        </div>
        <div className="my-[1rem] w-full h-auto">
          <p className="mb-[1%] font-nanumgothic font-semibold">본문</p>
          <TextEditor value={content} setValue={setContent} />
        </div>
        <RegistButton
          onHandleCancel={onHandleCancel}
          onHandleSave={post_TilInfo}
        />
      </div>
      <Footer />
    </>
  );
};

export default TilCreate;
