import '../../styles/Notice/NoticeList.scss';

import NoticeItem from './NoticeItem';
import NoticeRowLine from './NoticeRowLine';

const NoticeList = ({noticeList}) => {
    return(
        <div className="NoticeListBox">
            <NoticeRowLine/>
            {
                noticeList?.map(notice => <NoticeItem key={notice.postId} noticeItem={notice} isClick={false}/>)
            }
        </div>
    );
}

export default NoticeList;