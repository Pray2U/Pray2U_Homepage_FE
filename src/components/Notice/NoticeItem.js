import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import '../../styles/Notice/NoticeItem.scss';

const NoticeItem = ({noticeItem, isClick}) =>{

    const navigate = useNavigate();
    
    const onClickItem = (id) => {
        navigate(`/notice/detail/${id}`);
    }

    if(isClick){
        return(
            <div className="RowNoticeItemBox">
                <div className='NoticeItemNum'>
                    {noticeItem?.postId}
                </div>
                <div className='DClickNoticeItemTitle'>
                    {noticeItem?.title}
                </div>
                <div className='NoticeItemCreated'>
                    {dayjs(noticeItem?.createDate).format('YYYY-MM-DD')}
                </div>
                <div className='NoticeItemWriter'>
                    {noticeItem?.writerName}
                </div>
            </div>
        )
    }

    return(
        <div className="RowNoticeItemBox">
            <div className='NoticeItemNum'>
                {noticeItem?.postId}
            </div>
            <div className='NoticeItemTitle' onClick={()=>onClickItem(noticeItem?.postId)}>
                {noticeItem?.title}
            </div>
            <div className='NoticeItemCreated'>
                {dayjs(noticeItem?.createDate).format('YYYY-MM-DD')}
            </div>
            <div className='NoticeItemWriter'>
                {noticeItem?.writerName}
            </div>
        </div>
    );
};

export default NoticeItem;