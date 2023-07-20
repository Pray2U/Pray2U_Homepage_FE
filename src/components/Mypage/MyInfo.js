import { useEffect, useState } from "react";

import '../../styles/MyPage/MyInfo.scss';

import GitHubCalendar from 'react-github-calendar';
import MypageHeader from "../Header/MypageHeader";


const MyInfo = () =>{

    const dummyMyInfo = {
        userId : 1,
        githubId: "gildong Hong",
        username: "gildong",
        profileImgUrl: "/profile/HeaderProfile.png",
        phoneNumber: "010-0000-0001",
        Email: "gildong@gmail.com",
        Role: "USER",
        createDate: "2023-06-31",
        modifiedDate: "2023-07-01"
    };

    const [myInfo, setMyInfo] = useState(dummyMyInfo);
    const [myPoint, setMyPoint] = useState(null);
    // const [githubCommitCalendar, setGithubCalendar]  = useState(null);

    // const read_GithubCalendar = async() => {
    //     const calendar = <GitHubCalendar 
    //         username={"hs980924"||myInfo?.githubId}
    //         showWeekdayLabels 
    //         colorScheme="light"
    //     />
    //     setGithubCalendar(calendar);
    // };

    // useEffect(()=>{
    //     read_GithubCalendar();
    //     return () =>{
    //         setGithubCalendar(null);
    //     }
    // },[]);

    return(
        <div className="MyInfoBox">
            <div className="MyInfo">
                <div className="MyProfilBox">
                    <img src={myInfo?.profileImgUrl} className="ProfileImg" alt="Profile"/>
                    <div className="ProfileButton">이미지 변경</div>
                </div>
                <div className="MyInfoDetailBox">
                    <div className="InfoDetail">
                        <div className="InfoTitle">이름</div>
                        <div className="InfoContent">{myInfo?.name || "최형순"}</div>
                    </div>
                    <div className="InfoDetail">
                        <div className="InfoTitle">전화번호</div>
                        <div className="InfoContent">{myInfo?.phoneNumber || "010-1234-1234"}</div>
                    </div>
                    <div className="InfoDetail">
                        <div className="InfoTitle">이메일</div>
                        <div className="InfoContent">{myInfo?.Email || "choihs980924@gmail.com"}</div>
                    </div>
                    <div className="InfoDetail">
                        <div className="InfoTitle">Github</div>
                        <div className="InfoContent">{myInfo?.githubId || "HS980924"}</div>
                        
                    </div>
                </div>
                <div className="MyPointBox">
                    <div className="MyGetPoint">누적 포인트&nbsp;&nbsp;&nbsp;{myPoint?.totalPoint || 20000} pt</div>
                    <div className="MyGetPoint">주간 포인트&nbsp;&nbsp;&nbsp;{myPoint?.currentPoint || 20000} pt</div>
                    <div className='PointButtonBox'>
                        <div className='RemoveButton'>탈퇴</div>
                        <div className='SaveButton'>저장</div>
                    </div>
                </div>
            </div>
            <div className="MyCommitBox">
                <GitHubCalendar 
                    username={"hs980924"||myInfo?.githubId}
                    showWeekdayLabels 
                    colorScheme="light"/>
                {/* {githubCommitCalendar} */}
            </div>
        </div>
    );
}

export default MyInfo;