import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  setCookie,
  removeCookie,
  checkLogin,
  getCookie,
  tokenDecode,
  isCheckGuest,
} from "../../util/auth";

import LoginModal from "../Modal/LoginModal";
import Dropdown from "./Dropdown";

import "../../styles/Header/Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest ] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [myInfo, setMyInfo] = useState(null);
  const [view, setView] = useState(false);

  const menus = [
    {
      id: 0,
      title: "공지사항",
      link: "notice",
    },
    {
      id: 1,
      title: "이벤트",
      link: "event",
    },
    {
      id: 2,
      title: "TIL",
      link: "til",
    },
    {
      id: 3,
      title: "Shop",
      link: "shop",
    },
  ];

  const onHandleLoginModal = () => {
    setIsLoginModal(true);
  };

  const onCancelLoginModal = () => {
    setIsLoginModal(false);
  };

  const onHandleLogout = () => {
    removeCookie("accessToken");
    setView(false);
    setIsLoggedIn(false);
    window.location.replace("/");
  };

  const save_token = () => {
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      let payload = tokenDecode(accessToken);
      const options = {
        expires: new Date(payload?.exp * 1000),
      };
      setCookie("accessToken", accessToken, options);
      if (payload?.role === "ROLE_GUEST") {
        navigate("/signup");
      }
    }
  };

  const read_myInfomation = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyInfo(response.data.data);
      } else {
        alert("내 정보를 가져오는데 실패했습니다.");
        navigate("/");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    save_token();
    setIsLoggedIn(checkLogin("accessToken"));
    
    if (checkLogin("accessToken")) {
      let checkGuest = isCheckGuest();
      setIsGuest(checkGuest);
      if(!checkGuest){
        read_myInfomation();
      }
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-[70px]">
      <div className="w-[90%] flex justify-between h-[80%] px-4">
        <Link
          to={isGuest ? "/signup" : "/"}
          className="w-[25%] h-full flex justify-start items-center no-underline"
        >
          <img
            className="w-[50px] h-[50px]"
            alt="Logo_Image"
            src="img/logo.png"
          />
          <p className="font-bold ml-4 my-auto text-xl drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)]">
            <span className="text-[#84a3d4]">Pra</span>
            <span className="text-[#f27b7d]">y</span>
            <span className="bg-gradient-to-r from-[rgba(237,191,43,1)] via-[rgba(240,138,86,1)] to-[rgba(244,106,36,1)]/100 inline-block text-transparent bg-clip-text">
              2U
            </span>
          </p>
        </Link>
        <div className="flex justify-end items-center">
          {
            isLoggedIn && !isGuest? 
            <div className="flex mt-4 items-center justify-center w-full h-full font-bold text-[1rem]">
              {menus.map((menu) => (
                <Link
                  to={menu.link}
                  key={menu.id}
                  className={
                    menu.link === path
                      ? "no-underline text-[#0090F9] cursor-pointer mx-6 px-2"
                      : "no-underline text-slate-950 cursor-pointer mx-6 px-2 hover:text-[#0090F9]"
                  }
                >
                  <p>{menu.title}</p>
                </Link>
              ))}
            </div>
            :<></>
          }
          {isLoggedIn && !isGuest? (
            <div className="flex items-center h-full text-black font-bold text-[1.12rem]">
              <div className="w-[80px] h-[80px] relative box-border border-0 border-solid border-[#e5e7eb] ml-5 flex items-center mt-2">
                <img
                  src={myInfo?.profileImgUrl}
                  className="w-[40px] h-[40px] rounded-full"
                  onClick={() => setView(!view)}
                  alt="프로필"
                />
                {view && (
                  <Dropdown
                    onHandleLogout={onHandleLogout}
                    onSetView={setView}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex w-[150px] items-center h-full text-black font-bold text-[1.12rem]">
              <div
                className="flex justify-center ml-2 text-black no-underline cursor-pointer hover:text-[#0090f9] mt-2"
                onClick={() => onHandleLoginModal()}
              >
                로그인
              </div>
              {/* <Link to='/signup' className='SignUpButton'>회원가입</Link> */}
            </div>
          )}
        </div>
        {isLoginModal ? <LoginModal onCancel={onCancelLoginModal} /> : <></>}
      </div>
    </div>
  );
};

export default Header;
