
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';

import { timeTrans } from '../../util/time';
import { getCookie } from '../../util/auth';

import '../../styles/Comment/CommentItem.scss';

const CommentItem = ({commentInfo, myInfo, onRemove}) =>{

    const [ isMenu, setIsMenu ] = useState(false);

    return(
        <div className="CommentItemBox">
            <div className="CommentItemHeader">
                <img src={commentInfo?.user?.writerProfileImg} className='CommentItemProfile' alt="프로필"/>
                <div className='CommentItemWriter'>{commentInfo?.user?.writerName}</div>
                {
                    myInfo?.username === commentInfo?.user?.writerName ? 
                        <BsThreeDotsVertical className='CommentDots' onClick={()=>setIsMenu(!isMenu)}/>
                    : <></>
                }
                {
                    isMenu ?  
                    <ul className='CommentDropMenuBox'>
                        <li className='CommentDropMenu' onClick={()=>onRemove(commentInfo?.replyId)}>삭제</li>
                    </ul>
                    : <></>
                }
            </div>
            <div className="CommentItemContents">{commentInfo?.content}</div>
            <div className="CommentTime">{timeTrans(commentInfo?.createdDate)}</div>
        </div>
    );
}

export default CommentItem;