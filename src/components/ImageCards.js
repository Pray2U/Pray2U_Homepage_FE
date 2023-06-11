import React, { useState, useEffect } from "react";
import axios from "axios";

import Carousel from 'react-bootstrap/Carousel';

import '../styles/ImageCard.scss'


const ImageCards = () => {
    
    // 실제 데이터
    // const [ allUserInfo, setAllUserInfo ] = useState(null);

    // const read_AllUserInfo = async()=>{
    //     try{
    //         const url = 'api/user/info/all'
    //         const response = await axios.get(url, {withCredentials:true});
    //         setAllUserInfo(response.data.content);
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    // useEffect(()=>{
    //     read_AllUserInfo();
    // },[allUserInfo,]);

    

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