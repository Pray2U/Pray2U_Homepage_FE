
import { AiOutlineEye,AiOutlineComment } from "react-icons/ai";
import '../../styles/Notice/NoticeItem.scss';
import { useNavigate } from "react-router-dom";
import { noticeTime } from '../../util/time';

const NoticeItem = ({noticeItem}) =>{
    const navigate = useNavigate();

    const moveDetailPage = (id) =>{
        navigate(`/notice/detail/${id}`);
    }

    return(
        <div className="NoticeItemContainer" onClick={()=>moveDetailPage(noticeItem?.postId)}>
            <div className='WriterBox'>
                <img src={noticeItem?.user?.writerProfileImg} className='Profile'/>
                <div className='Writer'>{noticeItem?.user?.writerName}</div>
            </div>
            <div className='Title'>{noticeItem?.title}</div>
            <div className='DetailBox'>
                {/* <AiOutlineEye className="EyeIcon"/>
                <div className='WatchCnt'>{noticeItem?.watchCnt}</div>
                <AiOutlineComment/>
                <div className="Comment">{noticeItem?.commentCnt}</div> */}
                <div className='Time'>{noticeTime(noticeItem?.createDate)}</div>
            </div>
        </div>
    );
}

export default NoticeItem;