import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

import { uploadFileList } from "../../util/s3Upload";
import { getCookie, isCheckAdmin } from "../../util/auth";

import TextEditor from "../../components/TextEditor";
import RegistButton from "../../components/RegistButton";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

import "../../styles/Notice/NoticeCreate.scss";

const NoticeCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [fileNameList, setFileNameList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const onHandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const onHandleAddFile = (e) => {
    const fileLists = e.target.files;

    let fileNameLists = [...fileNameList];

    for (let i = 0; i < fileLists.length; i++) {
      fileNameLists.push(fileLists[i].name);
    }

    if (fileNameLists.length > 5) {
      fileNameLists = fileNameLists.slice(0, 5);
    }

    setFileNameList(fileNameLists);
    setFileList((fileList) => fileList.concat([...fileLists]));
  };

  const onHandleDeleteFile = (id) => {
    setFileNameList(fileNameList.filter((_, index) => index !== id));
    setFileList(fileList.filter((_, index) => index !== id));
  };

  const onHandleCancel = () => {
    navigate("/notice");
  };

  const post_noticeInfo = async () => {
    if (title && content) {
      try {
        let fileUrl = null;
        if (fileList) {
          fileUrl = await uploadFileList(fileList);
        }
        const postData = {
          title: title,
          content: content,
          fileUrl: fileUrl,
        };
        console.log(postData);
        const url = `${process.env.REACT_APP_API_SERVER}/api/admin/posts`;
        const response = await axios.post(url, postData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          alert("등록되었습니다.");
          navigate("/notice");
        } else {
          alert("등록 실패하셨습니다.");
          navigate("/notice");
        }
      } catch (e) {
        alert(e);
        navigate("/notice");
      }
    } else {
      alert("제목 혹은 내용을 채워주세요");
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
      <div className="w-[1080px] h-auto m-auto mt-[2%] mb-[1%]">
        <Title title={"공지사항 작성"} />
        <div className="mt-[2rem]">
          <p className="mb-[1%]">제목</p>
          <input
            placeholder="제목을 입력해주세요."
            className="NoticeCreateTitle"
            onChange={onHandleTitle}
          />
        </div>
        <div className="mb-[1rem] w-full h-auto">
          <p className="mb-[1%]">본문</p>
          <TextEditor value={content} setValue={setContent} />
        </div>
        <div className="mb-[1rem] w-full h-auto">
          <input
            type="file"
            id="input-file"
            multiple
            className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#0090F9] text-white cursor-pointer hover:bg-[#0B7FD3]"
            style={{ display: "none" }}
            onChange={onHandleAddFile}
          />
          <label
            htmlFor="input-file"
            className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#0090F9] text-white cursor-pointer hover:bg-[#0B7FD3]"
          >
            <div className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#0090F9] text-white cursor-pointer hover:bg-[#0B7FD3]">
              파일 업로드
            </div>
          </label>
          <div className="flex items-center w-full h-3rem mt-[0.5rem]">
            {fileNameList?.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center border-[0.1rem] border-solid border-[rgb(120, 117, 117)] rounded-[5rem] mr-[1rem] h-[80%]"
              >
                <div className="flex items-center pl-[1rem] text-[1rem] h-[80%] whitespace-nowrap">
                  {file}
                </div>
                <MdOutlineCancel
                  className="flex items-center w-[1.5rem] h-[1.5rem] ml-[1rem] mr-[0.5rem] cursor-pointer text-gray"
                  onClick={() => onHandleDeleteFile(idx)}
                />
              </div>
            ))}
          </div>
        </div>
        <RegistButton
          onHandleCancel={onHandleCancel}
          onHandleSave={post_noticeInfo}
        />
      </div>
      <Footer />
    </>
  );
};

export default NoticeCreate;
