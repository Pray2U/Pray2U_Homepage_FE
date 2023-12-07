import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, A11y, Autoplay, EffectCards } from "swiper";
import { AiFillGithub } from "react-icons/ai";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../util/auth";

import "swiper/swiper-bundle.min.css";
import "../../styles/Main/ImageCard.scss";

const ImageCards = () => {

  const [allUserInfo, setAllUserInfo] = useState(null);

  const read_AllUserInfo = async()=>{
      try{
        const url = `${process.env.REACT_APP_API_SERVER}/api/users?page=0&size=20&sort=id,DESC`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          setAllUserInfo([...response.data.data.content]);
        } else {
          alert(response.data.message);
        }
      }catch(e){
        alert(e.response.data.msg);
      }
  }

  useEffect(()=>{
      read_AllUserInfo();
  },[]);

  return (
    <div className="ImageCardBox">
      <Swiper
        className="SwiperBox"
        modules={[Navigation, A11y, Autoplay, EffectCards]}
        slidesPerView={3}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        }}
      >
        {allUserInfo?.map((user) => (
          <SwiperSlide className="SwiperSlideBox" key={user.userId}>
            <div className="ImageCardInfoBox">
              <img className="ImageCardProfile" src={user.profileImgUrl} alt="img" />
              <p className="ImageCardUserName">{user.username}</p>
              <p className="ImageCardEmail">{user.email}</p>
              <Link 
                to={`https://github.com/${user.githubId}`}
                target="_blank">
                <AiFillGithub className="ImageCardGithubIcon"/>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCards;
