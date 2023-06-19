
import '../../styles/Notice/NoticeItem.scss';

const NoticeItem = ({noticeItem}) =>{

    const onClickItem = (id) => {
        console.log(id);
    }

    return(
        <div className="RowNoticeItemBox" onClick={()=>onClickItem(noticeItem?.announcementsId)}>
            <div className='NoticeItemNum'>
                {noticeItem.announcementsId}
            </div>
            <div className='NoticeItemTitle'>
                {noticeItem.title}
            </div>
            <div className='NoticeItemCreated'>
                {noticeItem.createDate}
            </div>
            <div className='NoticeItemWriter'>
                {noticeItem.writer}
            </div>
        </div>
    );
};

export default NoticeItem;