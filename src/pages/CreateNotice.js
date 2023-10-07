import Header from "../components/Header/Header";
import NoticeEditor from "../components/Notice/NoticeEditor";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/Notice/Notice.scss';

const CreateNotice = () =>{

    const navigate = useNavigate();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isAdmin, setIsAdmin ] = useState(true);

    if(!isLoggedIn || !isAdmin){
        navigate('/error');
    }

    if(isLoggedIn && isAdmin){
        return(
            <div className="NoticeContainer">
                <Header isLoggedIn={isLoggedIn}/>
                <div className="TitleBox">
                    <div className="EN">Notice</div>
                    <div className="KR">공지사항</div>
                </div>
                <NoticeEditor noticeInfo={null} myName={'test'} />
            </div>
        );
    }
    
}

export default CreateNotice;