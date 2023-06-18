import '../../styles/Notice/NoticeList.scss';

import NoticeItem from './NoticeItem';

const NoticeList = ({noticeList}) => {
    return(
        <div className="NoticeListBox">
            <div className="RowTitle">
                <div className='RowNumBox'>No.</div>
                <div className='RowTitleBox'>Title</div>
                <div className='RowCreatedBox'>Create_at</div>
                <div className='RowWriterBox'>Writer</div>
            </div>
            {
                noticeList?.map(notice => <NoticeItem key={notice.announcementsId} noticeItem={notice}/>)
            }
        </div>
    );
}

export default NoticeList;