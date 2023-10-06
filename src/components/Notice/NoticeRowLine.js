
import '../../styles/Notice/NoticeRowLine.scss'

const NoticeRowLine = () =>{
    return(
        <div className="RowTitle">
            <div className='RowNumBox'>No.</div>
            <div className='RowTitleBox'>Title</div>
            <div className='RowCreatedBox'>Create_at</div>
            <div className='RowWriterBox'>Writer</div>
        </div>
    );
};

export default NoticeRowLine;