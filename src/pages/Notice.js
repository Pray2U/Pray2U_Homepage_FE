import Header from "../components/Header/Header";
import NoticeForm from "../components/Notice/NoticeForm";
import NoticeList from "../components/Notice/NoticeList";

import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import '../styles/Notice/Notice.scss';
import '../styles/Notice/NoticeButtons.scss';

import axios from 'axios';

const Notice = () =>{
    const navigate = useNavigate();
    const noticeDummyData = [
        { 
            "announcementsId":1,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01",
        },
        {
            "announcementsId":2,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":3,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":4,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        
        {
            "announcementsId":5,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":6,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":7,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        
        {
            "announcementsId":8,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":9,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":10,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":11,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":12,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":13,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":14,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "announcementsId":15,
            "title": "공지",
            "content": "오늘의 공지",
            "fileUrl":"http:~",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        }
    ]
    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ isLodding, setIsLodding ] = useState(false);
    const [ noticeList, setNoticeList ] = useState([...noticeDummyData]);
    const [ selectedPage, setSelectedPage ] = useState(1);
    const [ pageSetCnt, setPageSetCnt ] = useState(0);
    const [ pageNumList, setPageNumList ] = useState([
        1, 2, 3, 4, 5
    ]);

    useEffect(()=>{
        // read_NoticeList()
    },[selectedPage,noticeList])


    const pagePrevMoved = () => {
        if (selectedPage > 1){
            setSelectedPage(selectedPage-1);
            if((selectedPage%5) == 1){
                setPageSetCnt(parseInt(selectedPage/5)-1);
                setPageNumList(pageNumList.map((pageNum,idx) =>
                    5*(pageSetCnt-1)+(idx+1)    // pageSetCnt-1 한 이유는 pageSetCnt가 아직 업데이트가 안되기 때문
                ));
            }
        }
    }

    const pageNextMoved = () => {
        setSelectedPage(selectedPage+1);
        if(!(selectedPage%5)){
            setPageSetCnt(parseInt(selectedPage/5));
            setPageNumList(pageNumList.map((pageNum,idx) =>
                5*(pageSetCnt+1)+(idx+1)    // pageSetCnt-1 한 이유는 pageSetCnt가 아직 업데이트가 안되기 때문
            ));
        }
    }

    const pageSetPreMoved = () => {
        if(pageSetCnt){
            setPageSetCnt(pageSetCnt-1);
            setSelectedPage(5*(pageSetCnt-1)+1);
            setPageNumList(pageNumList.map((pageNum,idx) =>
                5*(pageSetCnt-1)+(idx+1)
            ));
        }    
    }
    
    const pageSetNextMoved = () => {
        setPageSetCnt(pageSetCnt+1);
        setSelectedPage(5*(pageSetCnt+1)+1);
        setPageNumList(pageNumList.map((pageNum,idx) =>
            5*(pageSetCnt+1)+(idx+1)
        ));
    }

    const onChangePageNum = (num) => {
        setSelectedPage(num);
    }

    const read_NoticeList = async() => {
        try{
            const url = `api/announcement/all?page=${selectedPage}&size=${15}&sort=id,desc`
            const response = await axios.get(url);
            setNoticeList(response.data.content);
            setIsLodding(false);
        }catch(e){
            console.log(e);
        }
    }

    const noticeWritePageMove = () =>{

    }
    
    if(isLodding){
        return(
            <div>
                데이터 가져오는중...
            </div>
        );
    }else{
        if(isLoggedIn){
            return(
                <div className="NoticeContainer">
                    <Header isLoggedIn={isLoggedIn}/>
                    <NoticeForm/>
                    <div className="NoticeButtonsBox">
                        <Link to='/notice/create' className="WriteButton" >
                            <div>쓰기</div>
                        </Link>
                    </div>
                    <NoticeList noticeList={noticeList}/>
                    <Pagination className='PaginationBox'>
                        <Pagination.First onClick={pageSetPreMoved}/>
                        <Pagination.Prev onClick={pagePrevMoved}/>
                        {
                            pageNumList.map(pageNum =>
                                selectedPage === pageNum ?
                                <Pagination.Item 
                                    key={pageNum} 
                                    active={true}>
                                    {pageNum}
                                </Pagination.Item> :
                                <Pagination.Item 
                                    key={pageNum} 
                                    active={false} 
                                    onClick={()=>onChangePageNum(pageNum)}>
                                        {pageNum}
                                </Pagination.Item>
                            )
                        }
                        <Pagination.Next onClick={pageNextMoved}/>
                        <Pagination.Last onClick={pageSetNextMoved}/>
                    </Pagination>
                </div>
            );
        }
        else{
            navigate('/');
        }
    }
}

export default Notice;