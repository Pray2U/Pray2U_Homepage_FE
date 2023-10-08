import Header from "../components/Header/Header";
import NoticeList from "../components/Notice/NoticeList";

import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";

import '../styles/Notice/Notice.scss';
import '../styles/Notice/NoticeButtons.scss';

import axios from 'axios';

const Notice = () =>{
    const navigate = useNavigate();
    const pageSize = 15;

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ isAdmin, setIsAdmin ] = useState(true);
    const [ isLodding, setIsLodding ] = useState(false);
    const [ noticeList, setNoticeList ] = useState(null);
    const [ selectedPage, setSelectedPage ] = useState(1);
    const [ pageSetCnt, setPageSetCnt ] = useState(0);
    const [ pageNumList, setPageNumList ] = useState(null);
    const [ totalPage, setTotalPage ] = useState(0);

    useEffect(()=>{
        read_NoticeList();
    },[selectedPage]);


    const pagePrevMoved = () => {
        if (selectedPage > 1){
            setSelectedPage(selectedPage-1);
            if((selectedPage%5) == 1){
                setPageSetCnt(parseInt(selectedPage/5)-1);
            }
        }
    }

    const pageNextMoved = () => {
        if(selectedPage < totalPage){
            setSelectedPage(selectedPage+1);
            if(!(selectedPage%5)){
                setPageSetCnt(parseInt(selectedPage/5));
            }
        }
    }

    const pageSetPreMoved = () => {
        if(pageSetCnt){
            setPageSetCnt(pageSetCnt-1);
            setSelectedPage(5*(pageSetCnt-1)+1);
        }    
    }
    
    const pageSetNextMoved = () => {
        if(pageSetCnt < parseInt(totalPage / 5)){
            setPageSetCnt(pageSetCnt+1);
            setSelectedPage(5*(pageSetCnt+1)+1);
        }
    }

    const onChangePageNum = (num) => {
        setSelectedPage(num);
    }

    const read_NoticeList = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts?pageNumber=${selectedPage-1}&pageSize=${pageSize}`
            const response = await axios.get(url,{withCredentials:true});
            setNoticeList([...response.data.data.content]);
            let totalpage = response.data.data.totalPages;
            setTotalPage(totalpage);
            create_NoticePageCnt(totalpage);
            setIsLodding(false);
        }catch(e){
            console.log(e);
        }
    }

    const create_NoticePageCnt = (totalPage) => {
        let startNum = 5*(pageSetCnt)+1;
        let endNum = parseInt(totalPage / 5) > pageSetCnt ? startNum+4 : totalPage;
        const newPageNumList = [...Array(endNum - startNum+1).keys()].map((i) => i + startNum)
        setPageNumList([...newPageNumList]);
    }

    if(!isLoggedIn){
        navigate('/error');
    }
    
    if(isLodding){
        return(
            <div>
                데이터 가져오는중...
            </div>
        );
    }else{
        return(
            <div className="NoticeContainer">
                <Header isLoggedIn={isLoggedIn}/>
                <div className="TitleBox">
                    <div className="EN">Notice</div>
                    <div className="KR">공지사항</div>
                </div>
                <div className="NoticeButtonsBox">
                    <Link to='/notice/create' className="WriteButton" hidden={isAdmin ? false : true}>
                        <AiFillPlusSquare className="NoticeCreateButton"/>
                    </Link>
                </div>
                <NoticeList noticeList={noticeList}/>
                <Pagination className='PaginationBox'>
                    <Pagination.First onClick={pageSetPreMoved}/>
                    <Pagination.Prev onClick={pagePrevMoved}/>
                    {
                        pageNumList?.map(pageNum =>
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
}

export default Notice;