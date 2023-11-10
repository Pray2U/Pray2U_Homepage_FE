import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../util/auth';
import axios from 'axios';

import MypageHeader from '../components/Header/MypageHeader';
import TilItem from '../components/Til/TilItem';
import Title from "../components/Title/Title";

import '../styles/MyPage/MyTIL.scss';

const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
};

const MyTil = () =>{

    const navigate = useNavigate();
    const pageSize = 15;

    const [ target, setTarget ] = useState(null);
    const [ myTilList, setMyTilList ] = useState([]);
    const [ pageCnt, setPageCnt ] = useState(0);
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ myInfo, setMyInfo ] = useState(null);
    const [ totalPageNum, setTotalPageNum ] = useState(null);

    const read_MyTilList = async(userId) =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/users/${userId}/tils?page=${pageCnt}&size=${pageSize}&sort=id,desc`;
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if (response.status === 200){
                setMyTilList(myTilList => myTilList.concat(response.data.data.content));
                setPageCnt(pageCnt+1);
                setTotalPageNum(response.data.data.totalPages);
                setIsLoaded(false);
            }else{
                alert('나의 TIL을 불러오는데 실패했습니다.');
                navigate('/');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    };

    const read_myInfo = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/users/me`;
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    },
                    withCredentials:true
                }
            );
            if(response.status === 200){
                setMyInfo(response.data.data);
                read_MyTilList(response.data.data.userId);
            }else{
                alert('내 정보를 가져오지 못했습니다.');
                navigate('/');
            }
            
        }catch(e){
            alert('서버 오류');
            navigate('/error');
        }
    };

    const onIntersect = async ([ entry ], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await read_MyTilList(myInfo?.userId);
            observer.observe(entry.target);
        }
    };

    useEffect(()=>{
        read_myInfo();
    },[]);

    useEffect(() => {
        let observer; // (1)observer 변수를 선언해주고
        if (target) { // (2) 관찰대상이 존재하는지 체크한다.
            observer = new IntersectionObserver(onIntersect , { 
                ...defaultOption
            }); // (3) 관찰대상이 존재한다면 관찰자를 생성한다.
            observer.observe(target); // (4) 관찰자에게 타겟을 지정한다.
        }
        return () => observer && observer.disconnect(); // 의존성에 포함된 값이 바뀔때 관찰을 중지한다.
    }, [target]);

    return(
        <div className='MyTilContainer'>
            <Title title={'Mypage'}/>
            <MypageHeader/>
            <div className="MyTilListBox">
                {
                    myTilList?.map(til =>
                        <TilItem key={til.tilId} tilInfo={til} myInfo={myInfo}/>
                    )
                } 
                {
                    totalPageNum > pageCnt ? 
                    <div ref={setTarget}>
                        {isLoaded && <p>Loading...</p>}
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
}

export default MyTil;