import React, { useState } from "react";

import Carousel from 'react-bootstrap/Carousel';

import '../styles/ImageCard.scss'

const ImageCards = () => {
    const [userCnt, setUserCnt] = useState(9);

    return(
        <div className="ImageCardBox">
            <Carousel>
                <Carousel.Item interval={7000}>
                    <div className="ImageGroup">
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={7000}>
                    <div className="ImageGroup">
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                        <img className="ImageCard" src="/profile/dummy card.png" alt='img' />
                    </div>
                </Carousel.Item>
                </Carousel>
        </div>
    );
}

export default ImageCards;