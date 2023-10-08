import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";
import dayjs from "dayjs";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../../styles/Notice/NoticeEditor.scss';

const NoticeEditor = ({noticeInfo,myName}) => {

    const navigate = useNavigate();
    const editorRef = useRef();

    const [ title, setTitle ] = useState('');
    const [ date, setDate ] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [ writerName, setWriterName ] = useState(myName);
    const [ content, setContent ] = useState('');
    const [ fileUrl, setFileUrl ] = useState(null);

    useEffect(()=>{
        if(noticeInfo){
            init_noticeInfo();
        }
    },[]);

    const init_noticeInfo = () => {
        setTitle(noticeInfo?.title);
        setDate(dayjs(noticeInfo?.createDate).format('YYYY-MM-DD'));
        setContent(noticeInfo?.content);
        setWriterName(noticeInfo?.writerName);
        setFileUrl(noticeInfo?.fileUrl);
    }

    const post_noticeInfo = async() => {
        if (title && content){
            try{
                const postData = {
                    title:title,
                    content:content,
                    fileUrl: fileUrl,
                }
                let url;
                let response;
                if(noticeInfo){
                    url = `${process.env.REACT_APP_API_SERVER}/api/posts/${noticeInfo?.postId}`;
                    response = await axios.put(url,postData,{withCredentials:true});
                }else{
                    url = `${process.env.REACT_APP_API_SERVER}/api/posts`;
                    response = await axios.post(url,postData,{withCredentials:true});
                }
                console.log(response)
                if (response.status === 200){
                    //모달창 띄우기(response.msg)
                    // 공지사항 list 페이지로 이동
                    navigate('/notice');
                }else{
                    //모달창 띄우기(response.msg)
                    // 공지사항 list 페이지로 이동
                    navigate('/notice');
                }
                // 공지사항 list 페이지로 이동
                navigate('/notice');
            }catch(e){
                console.log(e);
            }
        }else{
            // 모달창 띄우기
            // alert("내용 채우기");
        }
        
    };

    const onChagneTitle = (e) =>{
        setTitle(e.target.value);
    };

    const onChagneFile = (e) => {
        setFileUrl(e.target.files[0]);
    };

    const onChangeContents = () =>{
        setContent(editorRef.current?.getInstance().getMarkdown());
    }

    if(noticeInfo && content === null){
        return(
            <div>
                로딩 중
            </div>
        )
    }

    return(
        <div className="NoticeEditorBox">
            <div className="NoticeEditorButtons">
                <div className="SaveButton" onClick={()=>post_noticeInfo()}>저장</div>
            </div>
            <div className="RowNoticeEditorBox">
                <div className="RowNoticeId">No.</div>
                <div className="RowNoticeTitle">Title</div>
                <div className="RowNoticeCreated">Created_at</div>
                <div className="RowNoticeWriter">Writer</div>
            </div>
            <div className="NoticeInfoBox">
                <div className="NoticeInfoId">{noticeInfo ? noticeInfo?.postId : "New"}</div>
                <input type="text" defaultValue={title} className="NoticeInfoTitle" onChange={onChagneTitle}/>
                <div className="NoticeInfoCreated">{date}</div>
                <div className="NoticeInfoWriter">{writerName}</div>
            </div>
            <div className="NoticeEditor">
                <Editor
                    ref={editorRef} // DOM 선택용 useRef
                    previewStyle="vertical"
                    height="100%"
                    initialEditType="markdown"
                    initialValue={content ? content : ""}
                    hideModeSwitch="true"
                    useCommandShortcut={true}
                    language="ko-KR"
                    onChange={onChangeContents}
                    />
            </div>
            <div className="NoticeFileUpload">
                <input 
                    type="file"
                    onChange={onChagneFile} />
            </div>
        </div>
    )
}

export default NoticeEditor;