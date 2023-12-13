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

  const read_AllUserInfo = async () => {
    try {
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
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  useEffect(() => {
    read_AllUserInfo();
  }, []);

  return (
    <div className="ImageCardBox">
      <p className="font-bold text-4xl mt-4">
        <span className="text-[#84a3d4] font-poorstory">O</span>
        <span className="mr-4 font-poorstory">ur</span>

        <span className="font-poorstory">Mem</span>
        <span className="text-[rgba(237,191,43,1)] font-poorstory">b</span>
        <span className="font-poorstory">er</span>
      </p>
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
            <div className="ImageCardInfoBox shadow-[2px_2px_4px_2px] shadow-gray-300">
              <img
                className="ImageCardProfile"
                src={user.profileImgUrl}
                alt="img"
              />
              <p className="ImageCardUserName">{user.username}</p>
              <p className="ImageCardEmail">{user.email}</p>
              <Link to={`https://github.com/${user.githubId}`} target="_blank">
                <AiFillGithub className="ImageCardGithubIcon" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCards;
