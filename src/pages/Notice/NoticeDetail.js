import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
// import { AiOutlineEye } from "react-icons/ai";
import parse from "html-react-parser";
import axios from "axios";

import CommentForm from "../../components/Comment/CommentForm";
import SideMenu from "../../components/SideMenu";

import { getCookie, isCheckAdmin } from "../../util/auth";
import { noticeTime } from "../../util/time";

import "../../styles/Notice/NoticeDetail.scss";

const NoticeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathList = location.pathname.split("/");
  const postId = pathList[pathList.length - 1];

  const [noticeInfo, setNoticeInfo] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const read_NoticeItem = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${postId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setNoticeInfo(response.data.data);
        if (response.data.data.fileUrl) {
          setFileList(response.data.data.fileUrl?.split(","));
        } else {
          setFileList([]);
        }
      } else {
        alert("데이터 통신에 실패하였습니다.");
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const read_myInfo = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyInfo(response.data.data);
      } else {
        alert("내 정보를 가져오지 못했습니다.");
      }
    } catch (e) {
      alert("서버 오류");
      navigate("/error");
    }
  };

  const delete_NoticeItem = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/admin/posts/${postId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("공지사항이 삭제되었습니다.");
        navigate("/notice");
      } else {
        alert("데이터 통신에 실패하였습니다.");
        navigate("/");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onToggle = () => {
    navigate(`/notice/edit/${postId}`);
  };

  useEffect(() => {
    read_NoticeItem();
    read_myInfo();
    setIsAdmin(isCheckAdmin());
  }, []);

  return (
    <div className="w-[1080px] h-auto m-auto">
      <div className="w-full h-auto m-auto mt-[3%] border-b-[0.1rem] border-b-[#D2D4D9] border-b-solid font-bold">
        <div className="flex items-center h-[6rem]">
          <h1 className="flex items-center w-[95%] h-full m-[0%]">
            제목 : {noticeInfo?.title}
          </h1>
          {isAdmin ? (
            <SideMenu onToggle={onToggle} onRemove={delete_NoticeItem} isMyPost={myInfo?.userId === noticeInfo?.user?.writerId}/>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center w-full h-[3rem] pb-[0.5rem]">
          <img
            src={noticeInfo?.user?.writerProfileImg}
            alt="프로필"
            className="flex items-center justify-center w-[1.75rem] h-[1.75rem] border-1 border-[#D2D4D9] rounded-[50%] text-[5%] text-white mr-[1%]"
          />
          <div className="flex items-center text-[#424242] text-lg">
            {noticeInfo?.user?.writerName}
          </div>
          {/* <AiOutlineEye className="NoticeEyeIcon"/>
                    <div className='NoticeWatchCnt'>{noticeInfo?.cnt}</div> */}
          <div className="flex items-center ml-auto text-[1.125rem]">
            {noticeTime(noticeInfo?.createDate)}
          </div>
        </div>
      </div>
      <div className="w-full m-auto pt-[2rem] pb-[2rem] h-auto border-b-[0.1rem] border-b-solid border-b-[#D2D4D9]">
        {parse(`${noticeInfo?.content}`)}
      </div>
      {fileList ? (
        <div className="flex w-full h-[3rem] m-auto mt-[2rem]">
          {fileList?.map((fileUrl) => (
            <div
              className="flex items-center border-[0.1rem] border-solid border-[rgb(120,117,117)] rounded-[5rem] mr-[1rem] h-[80%] mt-4"
              key={fileUrl}
            >
              <div className="flex items-center whitespace-nowrap pl-1rem text-[1.15rem] h-[80%] pl-5">
                {decodeURI(fileUrl.split("_")[1])}
              </div>
              <Link
                to={fileUrl}
                className="flex items-center w-[1.5rem] h-[1.5rem] mx-[0.75rem] cursor-pointer"
              >
                <AiOutlineDownload className="w-full h-full hover:text-[#0090F9]" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {postId ? <CommentForm id={postId} myInfo={myInfo} /> : <></>}
    </div>
  );
};

export default NoticeDetail;
