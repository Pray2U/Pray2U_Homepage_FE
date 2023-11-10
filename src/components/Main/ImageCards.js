import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, A11y, Autoplay, EffectCards } from 'swiper';

import React, { useState, useEffect } from "react";
import axios from "axios";

import "swiper/swiper-bundle.min.css";
import "../../styles/Main/ImageCard.scss";


const ImageCards = () => {
    // 실제 데이터
    const userProfile = [
        {
            "userId" : 1,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        {
            "userId" : 2,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        {
            "userId" : 3,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        {
            "userId" : 4,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        {
            "userId" : 5,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        {
            "userId" : 6,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        ,
        {
            "userId" : 7,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        },
        ,
        {
            "userId" : 8,
            "username": "gildong",
            "profileImgUrl": "./img/dummy_card.png",
        }

    ]
    const [ allUserInfo, setAllUserInfo ] = useState(userProfile);

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

    return (
        <div className="ImageCardBox">
            <Swiper className="SwiperBox"
                modules={[Navigation, A11y, Autoplay, EffectCards]}
                slidesPerView={3}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    stopOnLastSlide: false,
                    waitForTransition: true 
                }}
            >
            {
                allUserInfo.map(user=>
                    <SwiperSlide className="SwiperSlideBox" key={user.userId}>
                        <img src={user.profileImgUrl} alt='img'/>
                    </SwiperSlide>
                )
            }
            </Swiper>
        </div>
    );
}

export default ImageCards;