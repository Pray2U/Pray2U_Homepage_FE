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

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);

    const [ userInfo, setUserInfo ] = useState();


    const options = {
        delay:500, // the scroll animation speed
        anchors: ['section1', 'section2', 'section3'],
    };
    
    return (
        <div className="ScreenBox">
            <SectionsContainer {...options}>
                <Section className="Section1">
                    <Header 
                        isLoggedIn={isLoggedIn} 
                        profile_url={userDummyData.profile_url}
                    />
                    <div className="BasicBox"/>
                    <div className="Illustration"/>
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