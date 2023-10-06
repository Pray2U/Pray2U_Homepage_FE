import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import '../../styles/Notice/NoticeItem.scss';

const NoticeItem = ({noticeItem}) =>{

    const navigate = useNavigate();
    const location = useLocation();

    const [ isClickTitle, setIsClickTitle ] = useState(true);
    

    const onClickItem = (id) => {
        navigate(`/notice/detail/${id}`);
    }

    const isClickCheck = () => {
        const path = location.pathname.split('/');
        path[2] === 'list' ? setIsClickTitle(true) : setIsClickTitle(false);
    }

    useEffect(()=>{
        isClickCheck();
        console.log(isClickTitle);
    },[]);

    return(
        <div className="RowNoticeItemBox">
            <div className='NoticeItemNum'>
                {noticeItem?.announcementsId}
            </div>
            {
                isClickTitle ? 
                <div className='NoticeItemTitle' onClick={()=>onClickItem(noticeItem?.announcementsId)}>
                    {noticeItem?.title}
                </div> :
                <div className='NoticeItemTitle'>
                    {noticeItem?.title}
                </div>

            }
            <div className='NoticeItemCreated'>
                {noticeItem?.createDate}
            </div>
            <div className='NoticeItemWriter'>
                {noticeItem?.writer}
            </div>
        </div>
    );
};

export default NoticeItem;