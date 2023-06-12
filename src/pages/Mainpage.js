import  { React, useState} from "react";
import { SectionsContainer, Section } from 'react-fullpage';

import Header from "../components/Header";
import Carousels from '../components/Carousels';
import Caterogies from '../components/Categories';
import PointRank from "../components/PointRank";
import ImageCards from "../components/ImageCards";
import Footer from "../components/Footer";

import '../styles/MainPage.scss'

const Mainpage = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(true);


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