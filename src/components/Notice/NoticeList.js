import '../../styles/Notice/NoticeList.scss';

import NoticeItem from './NoticeItem';
import NoticeRowLine from './NoticeRowLine';

const NoticeList = ({noticeList}) => {
    return(
        <div className="NoticeListBox">
            <NoticeRowLine/>
            {
                noticeList?.map(notice => <NoticeItem key={notice.announcementsId} noticeItem={notice}/>)
            }
        </div>
    );
}

export default NoticeList;