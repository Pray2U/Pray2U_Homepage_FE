import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

import TextEditor from "../../components/TextEditor";
import RegistButton from "../../components/RegistButton";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

import { getCookie } from "../../util/auth";
import {
  uploadFileList,
  deleteFileList,
  extractS3Key,
} from "../../util/s3Upload";

import "../../styles/Notice/NoticeCreate.scss";

const NoticeCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const postId = path[path.length - 1];

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [newFileList, setNewFileList] = useState([]);

  const onHandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const onHandleAddFile = (e) => {
    if (fileList.length + newFileList.length < 2) {
      const fileLists = e.target.files[0];
      setNewFileList((newfileList) => newfileList.concat([fileLists]));
      e.target.value = "";
    } else {
      alert("파일 업로드는 최대 2개까지 밖에 안됩니다.");
    }
  };

  const onHandleDeleteFile = (file) => {
    setFileList(fileList.filter((fileUrl) => fileUrl !== file));
    setDeleteFiles((deleteFiles) => deleteFiles.concat([file]));
  };

  const onHandleDeleteNewFile = (idx) => {
    setNewFileList((newFileList) =>
      newFileList.filter((file, index) => index !== idx)
    );
  };

  const onHandleCancel = () => {
    navigate("/notice");
  };

  const put_noticeInfo = async () => {
    if (title && content) {
      try {
        console.log(fileList);
        let fileUrl = fileList.join(",");
        if (newFileList.length) {
          const newFileUrlList = await uploadFileList(newFileList);
          fileUrl = fileUrl ? fileUrl + "," + newFileUrlList : newFileUrlList;
        }
        if (deleteFiles.length) {
          const s3ObjectKey = extractS3Key(deleteFiles);
          if (s3ObjectKey) {
            await deleteFileList(s3ObjectKey);
          }
        }
        const postData = {
          title: title,
          content: content,
          fileUrl: fileUrl,
        };
        const url = `${process.env.REACT_APP_API_SERVER}/api/admin/posts/${postId}`;
        const response = await axios.put(url, postData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          alert("수정 되었습니다.");
          navigate("/notice");
        } else {
          alert("수정 실패하셨습니다.");
          navigate("/notice");
        }
      } catch (e) {
        alert(e.response.data.message);
        navigate("/notice");
      }
    } else {
      alert("제목 혹은 내용을 채워주세요");
    }
  };

  const read_noticeItem = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${postId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setContent(response.data.data.content);
        setTitle(response.data.data.title);
        if (response.data.data.fileUrl) {
          setFileList(response.data.data.fileUrl?.split(","));
          // setFileNameList(response.data.data.fileUrl?.split(","));
        } else {
          // setFileNameList([]);
        }
      } else {
        alert("데이터 통신에 실패하였습니다.");
        navigate("/notice");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  useEffect(() => {
    read_noticeItem();
  }, []);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-4 mb-2">
        <Title title={"공지사항 작성"} />
        <div className="mt-[2rem]">
          <p className="mb-[1%] font-nanumgothic font-semibold">제목</p>
          <input
            defaultValue={title || ""}
            placeholder="제목을 입력해주세요."
            className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] mb-[1%] focus:border-[#0090F9] focus:outline-none"
            onChange={onHandleTitle}
          />
        </div>
        <div className="mb-[1rem] w-full h-auto">
          <p className="mb-[1%] font-nanumgothic font-semibold">본문</p>
          <TextEditor value={content} setValue={setContent} />
        </div>
        <div className="mb-[1rem] w-full h-auto">
          <input
            type="file"
            id="input-file"
            multiple
            className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#6495ED] text-white cursor-pointer hover:bg-[#557DE1]"
            style={{ display: "none" }}
            onChange={onHandleAddFile}
          />
          <label
            htmlFor="input-file"
            className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#6495ED] text-white cursor-pointer hover:bg-[#557DE1]"
          >
            <div className="flex items-center justify-center p-[0.25rem] w-[7rem] h-[2.5rem] rounded-[0.375rem] bg-[#6495ED] text-white cursor-pointer hover:bg-[#557DE1] font-jua">
              파일 업로드
            </div>
          </label>
          <div className="flex items-center w-full h-[3rem] mt-[0.5rem]">
            {fileList?.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center border-1 border-solid border-[rgb(120,117,117)] rounded-[5rem] mr-[1rem] h-[80%]"
              >
                <div className="flex items-center whitespace-nowrap pl-[1rem] text-[1rem] h-[80%]">
                  {decodeURI(file.split("_")[1]) !== "undefined"
                    ? decodeURI(file.split("_")[1])
                    : decodeURI(file)}
                </div>
                <MdOutlineCancel
                  className="flex items-center w-[1.5rem] h-[1.5rem] ml-[1rem] mr-[0.5rem] cursor-pointer text-gray"
                  onClick={() => onHandleDeleteFile(file)}
                />
              </div>
            ))}
            {newFileList?.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center border-1 border-solid border-[rgb(120,117,117)] rounded-[5rem] mr-[1rem] h-[80%]"
              >
                <div className="flex items-center whitespace-nowrap pl-[1rem] text-[1rem] h-[80%]">
                  {file?.name}
                </div>
                <MdOutlineCancel
                  className="flex items-center w-[1.5rem] h-[1.5rem] ml-[1rem] mr-[0.5rem] cursor-pointer text-gray"
                  onClick={() => onHandleDeleteNewFile(idx)}
                />
              </div>
            ))}
          </div>
        </div>
        <RegistButton
          onHandleCancel={onHandleCancel}
          onHandleSave={put_noticeInfo}
        />
      </div>
      <Footer />
    </>
  );
};

export default NoticeCreate;
