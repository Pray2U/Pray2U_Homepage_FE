import  { React, useEffect, useState} from "react";

import FullPageScroll from "../components/FullPage/FullPageScroll";
import Carousels from "../components/Main/Carousels";
import Caterogies from "../components/Main/Categories";
import PointRank from "../components/Main/PointRank";
import ImageCards from "../components/Main/ImageCards";

import '../styles/Main/Main.scss';
import { checkLogin } from "../util/auth";

const Main = () => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(checkLogin('accessToken'));
    },[isLoggedIn]);

    return(
        <>
            <FullPageScroll>
                <div className='MainSection'>
                    <img src="./img/frame.png" className="Illustration" alt="일러스트"/>
                </div>
                <div className='MainSection'>
                    {!isLoggedIn && <Carousels/> }
                    <Caterogies isLoggedIn={isLoggedIn}/>
                    {isLoggedIn && <PointRank/> }
                </div>
                <div className='MainSection'>
                    <ImageCards/>
                </div>
            </FullPageScroll>
        </>
    )
}

export default Main;