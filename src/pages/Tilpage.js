import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillPlusSquare, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Header from "../components/Header/Header";
import TilItem from "../components/Til/TilItem";

import '../styles/Til/Til.scss';


const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
};

const dummyContent = `안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?안녕하시지?안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?
    안녕하시지?`

const tilDummyData = [
    {
        tilId: 1,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 2,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    
    {
        tilId: 3,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 4,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 5,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 6,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 7,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 8,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 9,
        title: "2023-06-14 TIL",
        content: dummyContent,
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    }
]

const tilDummyData12 = [
    {
        tilId: 11,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 21,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    
    {
        tilId: 32,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 41,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 45,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 16,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 71,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 81,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    },
    {
        tilId: 59,
        title: "2023-06-14 TIL",
        content: "안녕하시지?",
        tag:[],
        createDate:"2023-06-14",
        modifiedDate:"2023-06-14",
        profileImgUrl: "/profile/HeaderProfile.png",
    }
]

const TilPage = () => {

    const navigate = useNavigate();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ pageCnt, setPageCnt ] = useState(1);
    const [ apiTilDataList, setApiTilDataList ] = useState(tilDummyData);
    const [ target, setTarget ] = useState(null);
    
    const [ isEditTil, setIsEditTil ] = useState(false);

    const read_tilDataAPi = async() => {
        try{
            setIsLoaded(true);
            // const url = `api/sdf${pageCnt}`;
            // const response = await axios.get(url);
            // if (response.code == 200){
            //     setApiTilDataList(apiTilDataList.concat(response.data));
            //     setPageCnt((pageCnt)=>pageCnt+1);
            // }
            // 모달창
            // tilDummyData
            setApiTilDataList(apiTilDataList.concat(tilDummyData12));
            setPageCnt((pageCnt)=>pageCnt+1);
            setIsLoaded(false);
        }catch(e){
            console.log(e);
        }
    }
    
    const moveTilCreatePage = () => {
        navigate('/til/create');
    }

    const onIntersect = async ([ entry ], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await read_tilDataAPi();
            observer.observe(entry.target);
        }
    };

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
            <Header isLoggedIn={isLoggedIn}/>
            <div className="TilTitleBox">
                <div className="Title">TIL</div>
                <div className="SubTitle">Today I Learned</div>
                <AiFillPlusSquare className="TilCreateButton" onClick={()=>moveTilCreatePage()} />
            </div>
            <div className="SearchBox">
                <div className="SearchBar">
                    <div className="FrontCircle"/>
                    <AiOutlineSearch className="SearchIcon"/>
                    <input className="SearchInput"/>
                    <div className="BackCircle"/>
                </div>
            </div>
            <div className="TilListBox">
                {
                    apiTilDataList?.map(til =>
                        <TilItem key={til.tilId} tilInfo={til}/>
                    )
                }
                <div ref={setTarget}>
                    {isLoaded && <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}

export default TilPage;