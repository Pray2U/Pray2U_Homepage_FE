import  { React, useState } from "react";

import Caterogies from '../components/Categories';
import Carousels from '../components/Carousels';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCards from "../components/ImageCards";
import PointRank from "../components/PointRank";

import { SectionsContainer, Section } from 'react-fullpage';

import '../styles/MainPage.scss'

const Mainpage = () => {
    
    const userDummyData = {
        username: '최형순',
        profile_url: '/profile/HeaderProfile.png',
    }

    const pointDummyData = {
        totalPoint : 25555, 
        currentPoint: 2454,
        weeklyScore: 2000
    }

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ myPointInfo, setMyPointInfo ] = useState(pointDummyData);
    const [ userInfo, setUserInfo ] = useState(userDummyData);


    const allowScroll = () => {
        // window.scrollBy(0, window.innerHeight);
    }


    const options = {
        delay:500, // the scroll animation speed
        anchors: ['section1', 'section2', 'section3'],
    };
    
    return (
        <div className="ScreenBox">
            <SectionsContainer {...options}>
                <Section className="Section1">
                    <Header isLoggedIn={isLoggedIn}/>
                    <div className="Illustration"/>
                    <div className="AllowBox"/>
                        {/* <button className="AllowButton" onClick={()=>allowScroll()}>
                        </button>
                    </div> */}
                </Section>
                <Section className="Section2">
                    {!isLoggedIn && <Carousels/> }
                    <Caterogies isLoggedIn={isLoggedIn}/>
                    {isLoggedIn && <PointRank/> }
                </Section>
                <Section className="Section3">
                    <ImageCards/>
                    <Footer/>
                </Section>
            </SectionsContainer>
        </div>
    );
}

export default Mainpage;