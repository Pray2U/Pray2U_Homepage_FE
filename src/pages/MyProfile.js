import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubCalendar from 'react-github-calendar';
import axios from "axios";
import { getCookie, removeCookie } from "../util/auth";

import MypageHeader from "../components/Header/MypageHeader";
import Title from "../components/Title/Title";
import Footer from "../components/Footer";
import Reconfirm from "../components/Reconfirm";

import '../styles/MyPage/MyProfile.scss';

const MyProfile = () => {
    
    const navigate = useNavigate();

    const [ myInfo, setMyInfo ] = useState(null);
    const [ myPoint, setMyPoint ] = useState(null);
    const [ phoneNum, setPhoneNum ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ userName, setUserName] = useState(null);
    const [ isDeleteModal, setIsDeleteModal ] = useState(false);

    const onDeleteClick = () => {
        setIsDeleteModal(true);
    }
    
    const onCloseModal = () => {
        setIsDeleteModal(false);
    }

    const onHandlePhoneNum = (e) => {
        setPhoneNum(e.target.value);
    }
    
    const onHandleEmail = (e) => {
        setEmail(e.target.value);
    }

    const onHandleUserName = (e) => {
        setUserName(e.target.value);
    }

    const delete_user = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/users`;
            const response = await axios.delete(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                alert('회원 탈퇴가 되셨습니다.');
                removeCookie('accessToken');
                navigate('/');
            }else{
                alert('세션이 만료되었습니다.');
            }
        }catch(e){
            alert(e.response.data.message);
        }
        setIsDeleteModal(false);
    }

    const put_myInfo = async() => {
        try{
            let putData = {
                profileImgUrl: myInfo?.profileImgUrl
            }
            if(userName !== myInfo.username){
                putData.username = userName;
            }
            if(phoneNum !== myInfo?.phoneNumber){
                putData.phoneNumber = phoneNum;
            }
            if(email !== myInfo?.email){
                putData.email = email;
            }
            if(Object.keys(putData).length > 1){
                const url = `${process.env.REACT_APP_API_SERVER}/api/users`;
                const response = await axios.put(url,putData,{
                    headers:{
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    },
                    withCredentials:true
                });
                if(response.status === 200){
                    alert(response.data.msg);
                    setMyInfo(response.data.data);
                    setEmail(response.data.data.email);
                    setPhoneNum(response.data.data.phoneNumber);
                    setUserName(response.data.data.username);
                }else{
                    alert('내 정보 수정하는데 실패했습니다.');
                }
            }else{
                alert("바뀐 정보가 없습니다.");
            }

        }catch(e){
            alert(e.response.data.message);
            console.log(e.response);
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
                setEmail(response.data.data.email);
                setPhoneNum(response.data.data.phoneNumber);
                setUserName(response.data.data.username);
            }else{
                alert('내 정보를 가져오는데 실패했습니다.');
                navigate('/');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    }

    const read_myPoint = async() =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/points/me`;
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setMyPoint(response.data.data);
            }else{
                alert('내 포인트를 가져오는데 실패했습니다.');
                navigate('/');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    }

    useEffect(()=>{
        read_myInfomation();
        read_myPoint();
    },[]);

    return(
        <>
            <div className="MyProfileContainer">
                <Title title={'Mypage'}/>
                <MypageHeader/>
                <div className="MyInfoBox">
                    <div className="MyInfo">
                        <div className="MyProfilBox">
                            <img src={myInfo?.profileImgUrl} className="ProfileImg" alt="Profile"/>
                            <div className="ProfileButton">이미지 변경</div>
                        </div>
                        <div className="MyInfoDetailBox">
                            <div className="InfoDetail">
                                <div className="InfoTitle">이름</div>
                                <input 
                                    className="InfoContent"
                                    value={userName || ""}
                                    onChange={onHandleUserName}
                                    />
                            </div>
                            <div className="InfoDetail">
                                <div className="InfoTitle">전화번호</div>
                                <input 
                                    className="InfoContent"
                                    value={phoneNum || ""}
                                    onChange={onHandlePhoneNum}
                                    />
                            </div>
                            <div className="InfoDetail">
                                <div className="InfoTitle">이메일</div>
                                <input 
                                    className="InfoContent"
                                    value={email || ""}
                                    onChange={onHandleEmail}
                                    />
                            </div>
                            <div className="InfoDetail">
                                <div className="InfoTitle">Github</div>
                                <div className="InfoNonInputContent">{myInfo?.githubId}</div>
                                
                            </div>
                        </div>
                        <div className="MyPointBox">
                            {/* <div className="MyGetPoint">누적 포인트&nbsp;&nbsp;&nbsp;{myPoint?.totalPoint} pt</div> */}
                            <div className="MyGetPoint">보유 포인트&nbsp;&nbsp;&nbsp;{myPoint?.currentPoint} pt</div>
                            <div className='PointButtonBox'>
                                <div className='RemoveButton' onClick={()=>onDeleteClick()}>회원탈퇴</div>
                                <div className='SaveButton'  onClick={()=>put_myInfo()}>저장</div>
                            </div>
                        </div>
                    </div>
                    <div className="MyCommitBox">
                    {
                        myInfo ? 
                        <GitHubCalendar 
                            username={(myInfo?.githubId).toLowerCase()}
                            showWeekdayLabels 
                            colorScheme="light"/> 
                        : <></>
                    }
                    </div>
                </div>
                {
                    isDeleteModal ? 
                        <Reconfirm 
                            message={"회원 탈퇴하시겠습니까?"}
                            cancleButton="취소"
                            OkButton="확인"
                            onCancel={onCloseModal}
                            onCheck={delete_user}
                            /> 
                    : <></> 
                }
            </div>
            <Footer/>
        </>
    );
}

export default MyProfile;