import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../util/auth';
import axios from 'axios';

import CommentItem from './CommentItem';

import '../../styles/Comment/CommentForm.scss';

const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
};

const CommentForm = ({id, myInfo}) =>{

    const navigate = useNavigate();

    const commentPageSize = 10;

    const [ target, setTarget ] = useState(null);
    const [ isLoadedComment, setIsLoadedComment ] = useState(true);
    const [ comment, setComment ] = useState(null);
    const [ comments, setComments ] = useState([]);
    const [ commentPage, setCommentPage ] = useState(0);
    const [ totalCommentPage, setTotalCommentPage ] = useState(null);
    const [ totalCommentCnt, setTotalCommentCnt ] = useState(null);

    const onHandleComment = (e) => {
        setComment(e.target.value);
    }

    const post_Comment = async() => {
        if(comment){
            try{
                const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${id}/replies`;
                const response = await axios.post(url,{ 'content':comment },
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie('accessToken')}`
                        },
                        withCredentials:true
                    }
                );
                if(response.status === 200){
                    alert('댓글 등록 성공');
                    const result = [response.data.data]
                    setComments(comments => result.concat(comments));
                    setTotalCommentCnt(totalCommentCnt+1);
                    setComment(null);
                    // window.location.reload();
                }else{
                    alert('댓글 목록을 가져오기 못했습니다.');
                }
                
            }catch(e){
                alert('서버 오류');
                navigate('/error');
            }
        }else{
            alert('댓글을 작성해주세요');
        }
    }

    const read_NoticeComments = async(id) => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${id}/replies?page=${commentPage}&size=${commentPageSize}&sort=id,desc`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setComments((comments) => comments.concat(response.data.data.content));
                setTotalCommentPage(response.data.data.totalPages);
                setTotalCommentCnt(response.data.data.totalElements);
                setCommentPage(commentPage+1);
                setIsLoadedComment(false);
            }else{
                alert('댓글 목록을 가져오기 못했습니다.');
            }
            
        }catch(e){
            alert('서버 오류');
            navigate('/error');
        }
    }

    const onRemove = async(replyId) => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${id}/replies/${replyId}`;
            const response = await axios.delete(url,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    },
                    withCredentials:true
                }
            );
            if(response.status === 200){
                alert('댓글이 삭제되었습니다.');
                setComments(comments=> comments.filter(comm => comm.replyId !== replyId));
            }else{
                alert(response.data.message);
            }
            
        }catch(e){
            alert(e.response.data.message);
        }
    }

    const onIntersect = async ([ entry ], observer) => {
        if (entry.isIntersecting && !isLoadedComment) {
            observer.unobserve(entry.target);
            await read_NoticeComments(id);
            observer.observe(entry.target);
        }
    };

    useEffect(()=>{
        read_NoticeComments(id);
    },[])

    useEffect(() => {
        let observer; // (1)observer 변수를 선언해주고
        if (target) { // (2) 관찰대상이 존재하는지 체크한다.
            observer = new IntersectionObserver(onIntersect , { 
                ...defaultOption
            }); // (3) 관찰대상이 존재한다면 관찰자를 생성한다.
            observer.observe(target); // (4) 관찰자에게 타겟을 지정한다.
        }
        return () => observer && observer.disconnect(); // 의존성에 포함된 값이 바뀔때 관찰을 중지한다.
    }, [target]);

    // if(!comments){
    //     return(
    //         <div>
    //             로딩 중...
    //         </div>
    //     )
    // }

    return(
        <>
            <div className="CommentFormContainer">
                <div className="CommentMyInfo">
                    <img src={myInfo?.profileImgUrl} className="CommentProfile" alt='profile'/>
                    <div className="CommentWriter">{myInfo?.username}</div>
                </div>
                <div className='CommentInfoBox'>
                    <textarea
                        rows={5} 
                        cols={100}
                        maxLength={500}
                        placeholder='자유로운 댓글을 남겨주세요.'
                        value={comment || ""}
                        onChange={(e)=>onHandleComment(e)}
                        className="CommentContents"/>
                    <div className="CommentLengthBox">
                        { comment ? comment?.length : 0 }/500
                    </div>
                </div>
                <div className="CommentFooter">
                    <div className="CommentWrite" onClick={()=>post_Comment()}>작성하기</div>
                </div>
            </div>
            <div className="NoticeComment">
                {
                    totalCommentCnt ? <div className="CommentCnt">댓글 { totalCommentCnt }</div> : <></>
                }
                {
                    comments?.map((com)=>
                        <CommentItem 
                            key={com.replyId} 
                            commentInfo={com}
                            myInfo={myInfo}
                            onRemove={onRemove}/>
                    )
                }
                {
                    totalCommentPage > commentPage ? 
                    <div ref={setTarget}>
                        {isLoadedComment && <p>Loading...</p>}
                    </div>
                    : <></>
                }
            </div>
        </>
    );
}

export default CommentForm;