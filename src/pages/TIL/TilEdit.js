import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextEditor from "../../components/TextEditor";
import RegistButton from "../../components/RegistButton";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

import { getCookie } from "../../util/auth";
import axios from "axios";

import "../../styles/Til/TilCreate.scss";

const TilEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const postId = path[path.length - 1];

  const [title, setTitle] = useState(null);
  const [tag, setTag] = useState(null);
  const [content, setContent] = useState(null);

  const onHandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const onHandleTag = (e) => {
    setTag(e.target.value);
  };

  const onHandleCancel = () => {
    navigate("/til");
  };

  const read_TilInfo = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${postId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setContent(response.data.data.content);
        setTitle(response.data.data.title);
        setTag(response.data.data.tag);
      } else {
        // 모달창 데이터 전송 오류
        alert("TIL 데이터를 불러오는데 실패했습니다.");
        navigate("/til");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/til");
    }
  };

  const put_TilInfo = async () => {
    if (title && tag && content) {
      try {
        const postData = {
          title: title,
          tag: tag,
          content: content,
        };
        const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${postId}`;
        const response = await axios.put(url, postData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          alert("수정 되었습니다.");
          navigate("/til");
        } else {
          alert("수정 실패하셨습니다.");
          navigate("/til");
        }
      } catch (e) {
        alert(e.response.data.message);
        navigate("/til");
      }
    } else {
      alert("제목 혹은 내용을 채워주세요");
    }
  };

  useEffect(() => {
    read_TilInfo();
  }, []);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-[2%] mb-[1%]">
        <Title title={"TIL 작성"} />
        {/* <h1 className="m-0 mb-[3%]">TIL 작성</h1> */}
        <div className=" mt-[2rem]">
          <p className="mb-[1%]">제목</p>
          <input
            defaultValue={title || ""}
            placeholder="제목을 입력해주세요."
            className="w-[98.5%] h-[2.25rem] border-solid border-[0.15rem] border-[hsla(220,9%,46%,.3)] rounded-[0.375rem] pl-[1%] text-[1rem] focus:border-[#0090F9] outline-none"
            onChange={onHandleTitle}
          />
        </div>
        <div className="mt-[1rem]">
          <p className="mb-[1%]">태그</p>
          <input
            defaultValue={tag || ""}
            placeholder="태그를 입력해주세요. (예: java, react)"
            className="w-[98.5%] h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] focus:border-[#0090F9] outline-none"
            onChange={onHandleTag}
          />
        </div>
        <div className="my-[1rem] w-full h-auto">
          <p className="mb-[1%]">본문</p>
          <TextEditor value={content} setValue={setContent} />
        </div>
        <RegistButton
          onHandleCancel={onHandleCancel}
          onHandleSave={put_TilInfo}
        />
      </div>
      <Footer/>
    </>
  );
};

export default TilEdit;
