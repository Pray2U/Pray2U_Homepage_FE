import { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from "../util/auth";

import Title from '../components/Title/Title';
import CreateButton from '../components/CreateButton';
import TilItem from '../components/Til/TilItem';
// import Reconfirm from '../components/Reconfirm';

import '../styles/Til/Til.scss';


const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
};

const Til = () => {

    const navigate = useNavigate();
    const pageSize = 10;

    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ target, setTarget ] = useState(null);
    const [ pageNumber, setPageNumber ] = useState(0);
    const [ totalPageNum, setTotalPageNum ] = useState(null);
    const [ apiTilDataList, setApiTilDataList ] = useState([]);
    const [ myInfo, setMyInfo ] = useState(null);
    const [ search, setSearch ] = useState(null);

    const onHandleSearch = (e) => {
        setSearch(e.target.value);
    }

    const searchClick = () => {
        if(search){
            alert('아직 기능이 구현되지 않았습니다.');
            setSearch(null);
            // navigate(`/search?query=${searchContent}`);
        }
    }
    
    const handleKeyDown = (e) =>{
        if(e.key === 'Enter' && search){
            alert('아직 기능이 구현되지 않았습니다.');
            setSearch(null);
            // navigate(`/search?query=${searchContent}`);
        }
    }
    

    const read_tilDataAPi = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/tils?page=${pageNumber}&size=${pageSize}&sort=id,desc`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                }
                ,withCredentials:true
            });
            if (response.status === 200){
                setApiTilDataList(apiTilDataList => apiTilDataList.concat(response.data.data.content));
                setPageNumber((pageNumber)=>pageNumber+1);
                setIsLoaded(false);
                setTotalPageNum(response.data.totalPages);
            }else{
                // 모달창 데이터 전송 오류
                alert('TIL 데이터를 불러오는데 실패했습니다.');
                navigate('/error');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    }

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
            }else{
                alert('내 정보를 가져오지 못했습니다.');
            }
            
        }catch(e){
            alert('서버 오류');
            navigate('/error');
        }
    };

    const onRemove = async(id) => {
        try{
            // 모달창 띄우고
            const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${id}`;
            const response = await axios.delete(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setApiTilDataList(apiTilDataList => apiTilDataList.filter(til => til.tilId !== id));
            }else{
                alert('TIL 삭제를 실패했습니다.');
            }
        }catch(e){
            alert(e);
            navigate('/error');
        }
    }

    const onIntersect = async ([ entry ], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await read_tilDataAPi();
            observer.observe(entry.target);
        }
    };
    
    useEffect(()=>{
        if(!search){
            read_tilDataAPi();
            read_myInfo();
        }
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
        <div className="TilContainer">
            <Title title='TIL' subTitle='Today I Learned'/>
            <CreateButton link={'/til/create'}/>
            <div className="SearchBox">
                <div className="SearchBar">
                    <AiOutlineSearch className="SearchIcon" onClick={()=>searchClick()}/>
                    <input 
                        className="SearchInput"
                        onChange={onHandleSearch}
                        onKeyDown={handleKeyDown}/>
                </div>
            </div>
            <div className="TilListBox">
                {
                    apiTilDataList?.map(til =>
                        <TilItem key={til.tilId} tilInfo={til} onRemove={onRemove} myInfo={myInfo}/>
                    )
                }
                {
                    totalPageNum > pageNumber ? 
                    <div ref={setTarget}>
                        {isLoaded && <p>Loading...</p>}
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}

export default Til;