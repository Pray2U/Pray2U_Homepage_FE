import { AiOutlineEye, AiOutlineComment } from "react-icons/ai";
import "../../styles/Notice/NoticeItem.scss";
import { useNavigate } from "react-router-dom";
import { noticeTime } from "../../util/time";

const NoticeItem = ({ noticeItem }) => {
  const navigate = useNavigate();

  const moveDetailPage = (id) => {
    navigate(`/notice/detail/${id}`);
  };

  return (
    <div
      className="w-full h-[14vh] m-auto py-[1%] border-t-[0.1rem] border-t-solid border-t-[#D2D4D9] no-underline text-black cursor-pointer hover:bg-[#eff1f4]"
      onClick={() => moveDetailPage(noticeItem?.postId)}
    >
      <div className="flex items-center w-full h-[30%]">
        <img
          src={noticeItem?.user?.writerProfileImg}
          className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#C2185B] text-white text-[60%] font-bold rounded-[50%] cursor-pointer no-underline"
        />
        <div className="flex items-center justify-center ml-[0.4rem] h-full font-bold text-[25px]">
          {noticeItem?.user?.writerName}
        </div>
      </div>
      <div className="flex items-center w-full h-[50%] font-bold text-sm">
        {noticeItem?.title}
      </div>
      <div className="flex items-center w-full h-[20%] font-bold ml-auto text-[#374151]">
        {/* <AiOutlineEye className="EyeIcon"/>
                <div className='WatchCnt'>{noticeItem?.watchCnt}</div>
                <AiOutlineComment/>
                <div className="Comment">{noticeItem?.commentCnt}</div> */}
        <div className="flex justify-center ml-auto mr-[0.5rem] text-sm">
          {noticeTime(noticeItem?.createDate)}
        </div>
      </div>
    </div>
  );
};

export default NoticeItem;
