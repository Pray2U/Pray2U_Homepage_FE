import  { React, useState} from "react";
import { SectionsContainer, Section } from 'react-fullpage';

import Header from "../components/Header/Header";
import Carousels from '../components/MainPage/Carousels';
import Caterogies from '../components/MainPage/Categories';
import PointRank from "../components/MainPage/PointRank";
import ImageCards from "../components/MainPage/ImageCards";
import Footer from "../components/MainPage/Footer";

import '../styles/Main/MainPage.scss';

const Mainpage = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    // 쿠키 유무 체크 후 자동 로그인(isLoggedIn true) 체크 해야됨


    const options = {
        delay:500, // the scroll animation speed
        anchors: ['page1', 'page2', 'page3'],
    };
    
    return (
        <div className="ScreenBox">
            <SectionsContainer {...options}>
                <Section>
                    <Header isLoggedIn={isLoggedIn}/>
                    <div className="Illustration"/>
                    <div className="AllowBox"/>
                </Section>
                <Section>
                    {!isLoggedIn && <Carousels/> }
                    <Caterogies isLoggedIn={isLoggedIn}/>
                    {isLoggedIn && <PointRank/> }
                </Section>
                <Section>
                    <ImageCards/>
                    <Footer/>
                </Section>
            </SectionsContainer>
        </div>
    );
}

export default Mainpage;