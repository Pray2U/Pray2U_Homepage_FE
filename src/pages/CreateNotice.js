import Header from "../components/Header/Header";
import NoticeForm from "../components/Notice/NoticeForm";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import '../styles/Notice/NoticeCreate.scss';
import '../styles/Notice/NoticeButtons.scss';

const CreateNotice = () =>{
    const navigate = useNavigate();

    const editorRef = useRef();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ currenDate, setCurrenDate ] = useState(null);
    const [ userName, setUserName ] = useState(null);
    const [ title, setTitle ] = useState(null);
    const [ postFile, setPostFile ] = useState(null);
    const [ content, setContent ] = useState(null);

    const get_TodayDate = () => {
        let today = new Date();

        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);

        let dateString = year + '-' + month  + '-' + day;
        setCurrenDate(dateString);
    };

    const get_UserInfo = () => {
        setUserName('최형순');
    };

    const onChagneTitle = (e) =>{
        setTitle(e.target.value);
        // console.log(title);
    };

    const onChagneFile = () => {

    };

    const onChangeContents = (e) =>{
        setContent(editorRef.current?.getInstance().getMarkdown())
        console.log(content);
    }

    const create_NoticePost = async() => {
        if (title && content){
            // try{
            //     const url = `api/announcements`;
            //     const postData = {
            //         title:title,
            //         content:content,
            //         fileUrl:postFile,
            //     }
            //     const response = await axios.post(url,postData);
            //     if (response.status === 200){
            //         //모달창 띄우기(response.msg)
            //         // 공지사항 list 페이지로 이동
            //     }else{
            //         //모달창 띄우기(response.msg)
            //         // 공지사항 list 페이지로 이동
            //     }
            //     // 공지사항 list 페이지로 이동
            // }catch(e){
            //     console.log(e);
            // }
            alert("저장 성공");
        }else{
            // 모달창 띄우기
            alert("내용 채우기");
        }
        
    };

    useEffect(()=>{
        get_TodayDate()
        get_UserInfo()
    },[]);

    if(isLoggedIn){
        return(
            <div className="NoticeContainer">
                <Header isLoggedIn={isLoggedIn}/>
                <NoticeForm/>
                <div className="NoticeButtonsBox">
                    <div className="SaveButton" onClick={()=>create_NoticePost()}>저장</div>
                </div>
                    <div className="RowNoticeTitleBox">
                        <div className="CreateNoticeTitle">Title</div>
                        <div className="CreateNoticeCreated">Created_at</div>
                        <div className="CreateNoticeWriter">Writer</div>
                    </div>
                    <div className="NoticeTitleWriteBox">
                        <input type="text" className="WriteNoticeTitle" onChange={onChagneTitle}/>
                        <div className="CreateNoticeCreated">{currenDate}</div>
                        <div className="CreateNoticeWriter">{userName}</div>
                    </div>
                    <Editor
                        ref={editorRef} // DOM 선택용 useRef
                        previewStyle="vertical"
                        height="55%"
                        initialEditType="markdown"
                        hideModeSwitch="true"
                        useCommandShortcut={true}
                        language="ko-KR"
                        onChange={onChangeContents}
                    />
                    <input 
                        type="file"
                        onChange={onChagneFile} />
            </div>
        );
    }
    else{
        navigate('/');
    }
    
}

export default CreateNotice;