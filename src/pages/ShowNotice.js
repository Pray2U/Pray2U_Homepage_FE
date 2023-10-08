import Header from "../components/Header/Header";
import NoticeItem from "../components/Notice/NoticeItem";
import NoticeRowLine from "../components/Notice/NoticeRowLine";
import CommentEditor from "../components/Notice/CommentEditor";
import CommentList from "../components/Notice/CommentList";

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Viewer } from '@toast-ui/react-editor';
import axios from "axios";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

// import '../styles/Notice/NoticeCreate.scss';
import '../styles/Notice/NoticeButtons.scss';
import '../styles/Notice/NoticeDetailForm.scss';

const ShowNotice = () => {

    const location = useLocation();

    const commentDummyData = [
        {
            reviewsId:1,
            content:"댓글 123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:2,
            content:"댓글 123123123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:3,
            content:"댓글 121414143",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:4,
            content:"댓글 1212123123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:5,
            content:"댓글 123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:6,
            content:"댓글 123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
        {
            reviewsId:1212,
            content:"댓글 123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },,
        {
            reviewsId:7,
            content:"댓글 123",
            createDate: "2023-06-29",
            modifiedDate:"2023-06-29",
        },
    ];
    
    const navigate = useNavigate();
    const editorRef = useRef();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ title, setTitle ] = useState(null);
    const [ postFile, setPostFile ] = useState(null);
    const [ noticeItem, setNoticeItem ] = useState(null);
    const [ noticeComments, setNoticeComments ] = useState(commentDummyData);


    const read_NoticeItem = async() => {
        try{
            const path = location.pathname.split('/');
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${path[path.length-1]}`;
            const response = await axios.get(url,{withCredentials:true});
            console.log(response.data.data);
            if(response.status == 200){
                setNoticeItem(response.data.data);
            }else{

            }
            
        }catch(e){
            console.log(e);
        }
    };
    const read_NoticeComments = async() => {
        // try{
        //     const url = ``;
        //     const response = await axios.get(url);
            
        // }catch(e){
        //     console.log(e);
        // }
        setNoticeComments(commentDummyData);
    }

    const delete_NoticeItem = async(id) => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${noticeItem?.postId}`;
            const response = await axios.delete(url);
            if(response.status === 200){
                // response.msg 모달창 띄우기
                // 공지사항 list 페이지 이동
                navigate('/');
            }else{
                // response.msg 모달창 띄우기
            }
            alert("삭제 완료");
        }catch(e){
            console.log(e);
        }
    }

    const delete_DoubleCheck = (id) => {
        let msg = "정말 삭제하시겠습니까?";
        // 정말 삭제할 것 인지? 모달창 띄워주기(msg)
        let isDelete = true;
        if(isDelete){
            delete_NoticeItem(id);
        }
    }

    useEffect(()=>{
        read_NoticeItem();
        read_NoticeComments();
    },[]);

    if(!isLoggedIn){
        navigate('/error');
    }

    if(!noticeItem){
        return(
            <div>정보 가져오는 중</div>
        )
    }

    if(isLoggedIn){
        return(
            <div className="NoticeDetailContainer">
                <Header isLoggedIn={isLoggedIn}/>
                <div className="DetailTitleBox">
                        <div className="EN">Notice</div>
                        <div className="KR">공지사항</div>
                    </div>
                <div className="DetailNoticeButtonsBox">
                    <Link to={`/notice/edit/${noticeItem?.postId}`} className="EditButton" >
                        수정
                    </Link>
                    <div className="DeleteButton" onClick={()=>delete_DoubleCheck(noticeItem?.postId)}>삭제</div>
                </div>
                <div className="NoticeListBox">
                    <NoticeRowLine/>
                    <NoticeItem noticeItem={noticeItem} isClick={true}/>
                    <Viewer
                        width="40%"
                        initialValue={noticeItem?.content}
                    />
                    <div>파일 다운로드</div>
                </div>
                {/* <div className="CommentSection">
                    <CommentEditor comment={""}/>
                    <CommentList commentList={noticeComments}/>
                </div> */}
            </div>
        );
    }
}

export default ShowNotice;