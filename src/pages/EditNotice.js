import Header from "../components/Header/Header";
import NoticeEditor from "../components/Notice/NoticeEditor";

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../styles/Notice/Notice.scss';
// import '../styles/Notice/NoticeCreate.scss';
// import '../styles/Notice/NoticeButtons.scss';

const EditNotice = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isAdmin, setIsAdmin ] = useState(true);
    const [ noticeInfo, setNoticeInfo ] = useState(null);

    const read_NoticeItem = async() => {
        try{
            const path = location.pathname.split('/');
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${path[path.length-1]}`;
            const response = await axios.get(url,{withCredentials:true});
            if(response.status == 200){
                setNoticeInfo(response.data.data);
            }
        }catch(e){
            console.log(e);
        }
    };

    useEffect(()=>{
        read_NoticeItem();
    },[]);
    
    if(!isLoggedIn || !isAdmin){
        navigate('/error');
    }

    if(isLoggedIn && isAdmin){
        if(noticeInfo?.content){
            return(
                <div className="NoticeContainer">
                    <Header isLoggedIn={isLoggedIn}/>
                    <div className="TitleBox">
                        <div className="EN">Notice</div>
                        <div className="KR">공지사항</div>
                    </div>
                    <NoticeEditor noticeInfo={noticeInfo} myName="test"/>
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
}

export default EditNotice;