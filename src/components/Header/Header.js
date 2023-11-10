import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { setCookie, removeCookie, checkLogin, getCookie, tokenDecode } from '../../util/auth';

import LoginModal from '../Modal/LoginModal';
import Dropdown from './Dropdown';

import '../../styles/Header/Header.scss'
import axios from 'axios';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ searchParams, setSearchParams] = useSearchParams();
    const [ searchContent, setSearchContent ] = useState(null);
    const [ isLoginModal, setIsLoginModal ] = useState(false);
    const [ myInfo, setMyInfo ] = useState(null);
    const [ view, setView ] = useState(false);

    const menus = [
        {
            id: 0,
            title: "공지사항",
            link: 'notice',
        },
        {
            id: 1,
            title: "이벤트",
            link: 'event',
        },
        {
            id: 2,
            title: "TIL",
            link: 'til',
        },
        {
            id: 3,
            title: "Shop",
            link: 'shop',
        }
    ]

    const onChageSearch = (e) => {
        setSearchContent(e.target.value);
    }

    const search = () => {
        if(searchContent){
            alert('아직 기능이 구현되지 않았습니다.');
            setSearchContent(null);
            // navigate(`/search?query=${searchContent}`);
        }
    }
    
    const handleKeyDown = (e) =>{
        if(e.key === 'Enter' && searchContent){
            alert('아직 기능이 구현되지 않았습니다.');
            setSearchContent(null);
            // navigate(`/search?query=${searchContent}`);
        }
    }
    
    const onHandleLoginModal = () =>{
        setIsLoginModal(true);
    }
    
    const onCancelLoginModal = () =>{
        setIsLoginModal(false);
    }

    const onHandleLogout = () => {
        removeCookie('accessToken');
        setView(false);
        setIsLoggedIn(false);
        window.location.replace('/');
    }

    const save_token = () => {
        const accessToken = searchParams.get('accessToken');
        if(accessToken){
            let payload = tokenDecode(accessToken);
            console.log(payload);
            const options = {
                expires: new Date(payload?.exp*1000),
            }
            setCookie('accessToken',accessToken,options);
            if(payload?.role === 'ROLE_GUEST'){
                navigate('/signup');
            }
        }
    }

    const read_myInfomation = async() =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/users/me`;
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setMyInfo(response.data.data);
            }else{
                alert('내 정보를 가져오는데 실패했습니다.');
                navigate('/');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    }

    useEffect(()=>{
        save_token();
        setIsLoggedIn(checkLogin('accessToken'));
        if(getCookie('accessToken')){
            read_myInfomation();
        }
    },[]);


    return(
        <div className='HeaderContainer'>
            <div className='HeaderBox'>
                <Link to='/' className='LogoLink'>
                    <img className='LogoImage' alt='Logo_Image' src='img/logo_title.png'/>
                </Link>
                <div className='MenuBox'>
                    {
                        menus.map((menu) =>
                            <Link to={menu.link} 
                                key={menu.id} 
                                className={ menu.link === path ? "SelectedMenu" : "Menu"}
                                >{menu.title}</Link>
                        )
                    }
                </div>
                <div className='SearchBarBox'>
                    <AiOutlineSearch className="SearchIcon" onClick={()=>search()}/>
                    <input className='SearchInput' 
                        placeholder="검색"
                        value={searchContent || ""}
                        onChange={onChageSearch}
                        onKeyDown={handleKeyDown}
                        />
                </div>
                {
                    isLoggedIn ? 
                    <div className='ButtonBox'>
                        <div className='MyProfileBox'>
                            <img src={myInfo?.profileImgUrl}
                                className='MyProfile'
                                onClick={()=>setView(!view)}
                                alt='프로필'
                            />
                            {
                                view && <Dropdown onHandleLogout={onHandleLogout} onSetView={setView}/>
                            }
                        </div>
                    </div>
                    :
                    <div className='ButtonBox'>
                        <div className='LoginButton' onClick={()=>onHandleLoginModal()}>로그인</div>
                        {/* <Link to='/signup' className='SignUpButton'>회원가입</Link> */}
                    </div>
                }
            </div>
            {
                isLoginModal ? <LoginModal onCancel={onCancelLoginModal}/> : <></>
            }
        </div>
    )

    
}

export default Header;
