import CommentItem from "./CommentItem";

import '../../styles/Notice/CommentList.scss';

const CommentList = ({commentList}) => {
    return(
        <div className="CommentListBox">
            {
                commentList?.map(commentInfo => 
                    <CommentItem
                        key={commentInfo.reviewsId} 
                        userId={commentInfo.reviewsId}
                        comment={commentInfo.content}
                    />)
            }
        </div>
    );
}

export default CommentList;