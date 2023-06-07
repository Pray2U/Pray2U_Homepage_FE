import React from "react";

import Caterogies from '../components/Categories';
import Carousels from '../components/Carousels';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCards from "../components/ImageCards";

import { SectionsContainer, Section } from 'react-fullpage';

import '../styles/MainPage.scss'

const Mainpage = () => {
    const options = {
        delay:500, // the scroll animation speed
        anchors: ['section1', 'section2', 'section3'],
    };
    
    return (
        <div className="ScreenBox">
            <SectionsContainer {...options}>
                <Section className="Section1">
                    <Header/>
                    <div className="BasicBox"/>
                    <div className="Illustration"/>
                </Section>
                <Section className="Section2">
                    <Carousels/>
                    <Caterogies/>
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