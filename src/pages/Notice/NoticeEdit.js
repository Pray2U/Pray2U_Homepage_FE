import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

import TextEditor from "../../components/TextEditor";
import RegistButton from "../../components/RegistButton";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";
import { getCookie } from "../../util/auth";

import axios from "axios";

import "../../styles/Notice/NoticeCreate.scss";
import { uploadFileList } from "../../util/s3Upload";

const NoticeCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const postId = path[path.length - 1];

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [fileNameList, setFileNameList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [deleteFileList, setDeleteFileList ] = useState([]);

  const onHandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const onHandleAddFile = (e) => {
    // const fileLists = e.target.files;

    // let fileNameLists = [...fileNameList];

    // for (let i = 0; i < fileLists.length; i++) {
    //   fileNameLists.push(fileLists[i].name);
    // }

    // if (fileNameLists.length > 5) {
    //   fileNameLists = fileNameLists.slice(0, 5);
    // }

    // setFileNameList(fileNameLists);
    // setFileList((fileList) => fileList.concat([...fileLists]));

    const fileLists = e.target.files[0];

    let fileNameLists = [...fileNameList];

    fileNameLists.push(fileLists.name);

    if (fileNameLists.length > 5) {
      fileNameLists = fileNameLists.slice(0, 5);
    }

    setFileNameList([...fileNameLists]);
    setFileList((fileList) => fileList.concat([fileLists]));
    e.target.value = '';
  };

  const onHandleDeleteFile = (file) => {
    setFileNameList(
      fileNameList.filter((fileName, index) => fileName !== file)
    );
    setFileList(fileList.filter((fileName, index) => fileName.name !== file));
    setDeleteFileList((deleteFileList) => deleteFileList.concat([file]));
    // 인덱스 값으로 진행하였다가 fileNameList와 fileList에서 같은 데이터의 인덱스 값이 달라
    // 지워지지 않는 데이터가 존재하여 filename으로 필터를 진행 해당 부분은 좀 더 수정할 필요가 있어보임
  };

  const onHandleCancel = () => {
    navigate("/notice");
  };

  const put_noticeInfo = async () => {
    if (title && content) {
      try {
        let fileUrl = null;
        if (fileNameList.length) {
          fileUrl = fileNameList
            .filter((file) => file.includes("https"))
            .join(",");
        }
        if (fileList.length) {
          fileUrl = fileUrl
            ? fileUrl + "," + (await uploadFileList(fileList))
            : await uploadFileList(fileList);
        }
        console.log(fileUrl);
        const postData = {
          title: title,
          content: content,
          fileUrl: fileUrl ? fileUrl : "",
        };
        console.log(postData);
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
          setFileNameList(response.data.data.fileUrl?.split(","));
        } else {
          setFileNameList([]);
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
          <p className="mb-[1%]">제목</p>
          <input
            defaultValue={title || ""}
            placeholder="제목을 입력해주세요."
            className="w-full h-[2.25rem] border-solid border-[0.15rem] rounded-[0.375rem] border-[hsla(220,9%,46%,.3)] pl-[1%] text-[1rem] mb-[1%] focus:border-[#0090F9] focus:outline-none"
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
          <div className="flex items-center w-full h-[3rem] mt-[0.5rem]">
            {fileNameList?.map((file, idx) => (
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
