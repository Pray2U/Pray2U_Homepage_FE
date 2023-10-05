import { useState } from "react";

import '../../styles/Notice/CommentEditor.scss';
import axios from "axios";

const CommentEditor = ({comment}) => {

    const [ comments, setComment ] = useState(comment);

    const post_Comment = async() => {
        if(comments){
            // try{
            //     const postData = {
            //         comment: comments
            //     }
            //     const url = 'api/reviews';
            //     const res = await axios.post(url,postData);
            // }catch(e){
            //     console.log(e);
            // }
            // console.log(comments);
            alert(comments);
        }else{
            let msg = '댓글 내용을 입력해주세요';
            alert(msg);
        }
        
    }

    const onChangeCommentHandler = (e) =>{
        console.log(comments);
        setComment(e.target.value);
    }

    return(
        <div className="CommentBox">
            <textarea
                className="CommentInput"
                value={comments}
                onChange={onChangeCommentHandler}
            />
            <button
                className="CommentButton"
                onClick={()=>post_Comment()}>댓글 쓰기</button>
        </div>
    );
}

export default CommentEditor;