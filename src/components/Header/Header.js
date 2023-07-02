import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import '../../styles/Header/Header.scss';

const Header = ({isLoggedIn}) => {

    // 테스트 더미
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

    // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ myInfo, setMyInfo ] = useState(dummyMyInfo);

    const checkIsLoggenIn = () => {
        // 쿠키가 있는지 확인하는 방법?
        // 서버에 요청을 해야하나?
        // 결정을 해야할듯
    };

    // 실제 사용할 데이터
    // const read_myInfo = async() =>{
    //     try{
    //         const url = "";
    //         const response = await axios.get(url, {withCredentials:true});
    //         setMyInfo(response.data);
    //     }catch(e){
    //         console.log(e);
    //     }
    // };

    // useEffect(()=>{
    //     checkIsLoggenIn();
    //     read_myInfo();
    // },[isLoggedIn,myInfo]);

    if(isLoggedIn){
        return (
            <div className="HeaderBox">
                <img className="Logo" alt='img' src="/Logo.png"></img>
                <Link to ='/' className='LogoName'>PRAY<span className="RedColor">2</span>U</Link>
                <div className='MenuBox'>
                    <Link to='/notice/list' className='Notice'>Notice</Link>
                    <Link to='/event' className='Event'>Event</Link>
                    <Link to='/til' className='TIL'>TIL</Link>
                    <Link to='/shop' className='Shop'>Shop</Link>
                    <Link to='/mypage' className='Profile'>
                        <img src={myInfo.profileImgUrl}/>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="HeaderBox">
            <img className="Logo" alt='img' src="/Logo.png"></img>
            <Link to ='/' className='LogoName'>PRAY<span className="RedColor">2</span>U</Link>
            <Link to='/signin' className='SignIn'>Sign-In</Link>
        </div>
    );
}

export default Header;