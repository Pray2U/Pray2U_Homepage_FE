import { useState } from "react";

import Template from "../components/Template";
import MypageHeader from "../components/Header/MypageHeader";
import MyAttend from "../components/Mypage/MyAttend";
import MyInfo from "../components/Mypage/MyInfo";
import MyTil from "../components/Mypage/MyTil";

import '../styles/MyPage/Mypage.scss';
import MyShop from "../components/Mypage/MyShop";

const Mypage = () =>{

    const [selectedMenu, setSelectedMenu] = useState(0);

    const onChangeMenu = (id) =>{
        setSelectedMenu(id);
    }

    const myPageComponent = [
        <MyInfo/>,
        <MyAttend/>,
        <MyTil/>,
        <MyShop/>
    ]

    return(
        <>
            <Template>
                <div className="MyPageTitleBox">
                    <div className="MyPageTitle">My Page</div>
                    <div className="MyPageSubTitle">Pray2U Member</div>
                </div>
                {/* <div className={selectedMenu < 2 ? "MyPageContainer" : "MyPageOverFlowContainer"}> */}
                <div className="MyPageContainer">
                    <MypageHeader onChangeMenu={onChangeMenu} selectedMenu={selectedMenu}/>
                    {
                    myPageComponent?.map((component,idx) =>
                        idx === selectedMenu ? component : <></>
                    )
                    }
                </div>
            </Template>
        </>
    );
}

export default Mypage;