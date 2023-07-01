import Header from "../components/Header/Header";
import NoticeForm from "../components/Notice/NoticeForm";
import NoticeItem from "../components/Notice/NoticeItem";
import NoticeRowLine from "../components/Notice/NoticeRowLine";

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../styles/Notice/NoticeCreate.scss';
import '../styles/Notice/NoticeButtons.scss';

const EditNotice = () =>{
    const navigate = useNavigate();

    const editorRef = useRef();

    const dummyData = {
        announcementsId: 1,
        title: "오늘의 공지",
        writer: '최재훈',
        createDate: '2023-06-22',
        content: '## 하는일',
        fileUrl: 'ssss'
    }

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isAdmin, setIsAdmin ] = useState(true);
    const [ noticeInfo, setNoticeInfo ] = useState(null);
    const [ userName, setUserName ] = useState(null);
    const [ title, setTitle ] = useState(null);
    const [ fileUrl, setFileUrl ] = useState(null);
    const [ content, setContent ] = useState(null);

    const get_UserInfo = () => {
        setUserName('최형순');
    };

    const onChagneTitle = (e) =>{
        setTitle(e.target.value);
    };

    const onChagneFile = (e) => {
        setFileUrl(e.target.files[0]);
    };

    const onChangeContents = () =>{
        setContent(editorRef.current?.getInstance().getMarkdown());
        console.log(content);
        console.log(noticeInfo.content);
    }

    const read_NoticeItem = () => {
        // try{
        //     const url = `/api/announcements/{announcementId}`;
        //     const response = await axios.get(url);
        //     setNoticeInfo(response.data);
        //     setContent(response.data.content);
        //     setTitle(response.data.title);
        //     setPostFile(response.data.fileUrl);
        // }catch(e){
        //     console.log(e);
        // }
        // setNoticeInfo(dummyData);
        setNoticeInfo(dummyData);
        setTitle(dummyData.title);
        setFileUrl(dummyData.fileUrl);
        setContent(dummyData.content);
    };

    const Edit_NoticePost = async(id) => {
        if (title && content){
            // try{
            //     const url = `/api/announcements/${id}`;
            //     const postData = {
            //         title:title,
            //         content:content,
            //         fileUrl:fileUrl,
            //     }
            //     const response = await axios.post(url,postData);
            //     if (response.status === 200){
            //         //모달창 띄우기(response.msg)
            //         // 공지사항 디테일 페이지로 이동
            //     }else{
            //         //모달창 띄우기(response.msg)
            //         // 공지사항 디테일 페이지로 이동
            //     }
            // // 공지사항 디테일 페이지로 이동
            // }catch(e){
            //     console.log(e);
            // }
            alert('수정 완료');
        }else{
            // 모달창 띄우기
            alert("내용 채우기");
        }
        
    };

    useEffect(()=>{
        read_NoticeItem();
    },[]);
    

    if(isLoggedIn && isAdmin){
        if(noticeInfo?.content){
            return(
                <div className="NoticeContainer">
                    <Header isLoggedIn={isLoggedIn}/>
                    <NoticeForm/>
                    <div className="NoticeButtonsBox">
                        <div className="SaveButton" onClick={()=>Edit_NoticePost(noticeInfo?.announcementsId)}>저장</div>
                    </div>
                    <div className="NoticeListBox">
                        <NoticeRowLine/>
                        <NoticeItem noticeItem={noticeInfo}/>
                        <Editor
                            ref={editorRef} // DOM 선택용 useRef
                            previewStyle="vertical"
                            height="55%"
                            initialEditType="markdown"
                            initialValue={noticeInfo?.content}
                            hideModeSwitch="true"
                            useCommandShortcut={true}
                            language="ko-KR"
                            onChange={onChangeContents}
                        />
                        <input type="file" onChange={onChagneFile} />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    로딩중
                </div>
            );
        }
    }
    else{
        navigate('/NotFound');
        return null;
    }
}

export default EditNotice;