
import { useState, useEffect } from 'react';
import TilItem from '../Til/TilItem';

import '../../styles/MyPage/MyTil.scss';

const MyTil = () =>{

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

    const [myTilList, setMyTilList] = useState(tilDummyData);


    const read_MyTilList = async() =>{
        try{
            // setIsLoaded(true);
            // const url = `api/sdf${pageCnt}`;
            // const response = await axios.get(url);
            // if (response.code == 200){
            //     setApiTilDataList(apiTilDataList.concat(response.data));
            //     setPageCnt((pageCnt)=>pageCnt+1);
            // }
            // 모달창
            // tilDummyData
            setMyTilList(myTilList.concat(tilDummyData));
            // setPageCnt((pageCnt)=>pageCnt+1);
            // setIsLoaded(false);
        }catch(e){
            console.log(e);
        }
    };

    useEffect(()=>{

    },[]);

    return(
        <div className="MyTilListBox">
            {
                myTilList?.map(til =>
                    <TilItem key={til.tilId} tilInfo={til}/>
                )
            }
        </div>
    );
}

export default MyTil;