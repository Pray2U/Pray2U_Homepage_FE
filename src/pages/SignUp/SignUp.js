import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SignUpForm from "../../components/SignUp/SignUpForm";
import Footer from "../../components/Footer";

import "../../styles/SignUp/SignUp.scss";
import { getCookie, tokenDecode } from "../../util/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const payload = tokenDecode(getCookie("accessToken"));
    if (payload) {
      if (payload.role === "ROLE_GUEST") {
        setIsGuest(true);
      } else {
        navigate("/error");
      }
    }
  }, []);

  if (!isGuest) {
    return <></>;
  }
  return (
    <>
      <div className="flex w-[1280px] h-[100vh] m-auto mx-[0] my-auto">
        <div className="w-[50%] h-full relative bg-[#F5F7FF]">
          <div className="flex mt-[20%] justify-center w-full h-[10%]">
            <img src="./img/logo.png" alt="imgLogo" />
          </div>
          <SignUpForm />
          <div className="w-full h-[20%] absolute bottom-0 bg-[#413368]" />
        </div>
        <img
          src="./img/signup_illustration.png"
          className="w-[50%] h-full"
          alt="illustration"
        />
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
