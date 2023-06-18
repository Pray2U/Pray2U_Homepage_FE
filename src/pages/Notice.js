import Header from "../components/Header/Header";
import NoticeForm from "../components/Notice/NoticeForm";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/Notice/Notice.scss';

const Notice = () =>{
    const navigate = useNavigate();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);

    if(isLoggedIn){
        return(
            <div className="NoticeContainer">
                <Header isLoggedIn={isLoggedIn}/>
                <NoticeForm/>
            </div>
        );
    }
    else{
        navigate('/');
    }
    
}

export default Notice;