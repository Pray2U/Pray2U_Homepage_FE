import { React, useEffect, useState } from "react";

import FullPageScroll from "../../components/FullPage/FullPageScroll";
import Carousels from "../../components/Main/Carousels";
import Caterogies from "../../components/Main/Categories";
import PointRank from "../../components/Main/PointRank";
import ImageCards from "../../components/Main/ImageCards";

import "../../styles/Main/Main.scss";
import { checkLogin } from "../../util/auth";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkLogin("accessToken"));
  }, [isLoggedIn]);

  return (
    <>
      <FullPageScroll>
        <div className="w-[1280px] h-auto m-auto bg-[#110042]">
          <img
            src="./img/frame.png"
            className="w-full h-full bg-[#F5F7FF] bg-repeat"
            alt="일러스트"
          />
        </div>
        <div className="w-[1280px] h-auto m-auto bg-[#110042]">
          {!isLoggedIn && <Carousels />}
          <Caterogies isLoggedIn={isLoggedIn} />
          {isLoggedIn && <PointRank />}
        </div>
        <div className="w-[1280px] h-auto m-auto bg-[#110042]">
          <ImageCards />
        </div>
      </FullPageScroll>
    </>
  );
};

export default Main;
