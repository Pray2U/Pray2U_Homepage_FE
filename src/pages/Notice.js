import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NoticeItem from "../components/Notice/NoticeItem";
import CreateButton from "../components/CreateButton";
import Title from "../components/Title/Title";
import Paging from "../components/Paging";

import axios from 'axios';
import { getCookie, isCheckAdmin } from "../util/auth";

import '../styles/Notice/Notice.scss';
import Footer from "../components/Footer";

const Notice = () =>{
    
    const navigate = useNavigate();
    const pageSize = 10;
    
    const [ selectedPage, setSelectedPage ] = useState(1);
    const [ totalItemCnt, setTotalItemCnt ] = useState(null);
    const [ noticeList, setNoticeList ] = useState([]);
    const [ isAdmin, setIsAdmin ] = useState(false);

    const read_NoticeList = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts?pageNumber=${selectedPage-1}&pageSize=${pageSize}&sort=id,desc`
            const response = await axios.get(url,
                {
                    headers:{
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    },
                    withCredentials:true
                });
            if(response.status === 200){
                setNoticeList([...response.data.data.content]);
                setTotalItemCnt(response.data.data.totalElements);
            }else{
                alert(response.data.message);
            }
            // setIsLodding(false);
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    }

    // const create_NoticePageCnt = (totalPage) => {
    //     let startNum = 5*(pageSetCnt)+1;
    //     let endNum = parseInt(totalPage / 5) > pageSetCnt ? startNum+4 : totalPage;
    //     const newPageNumList = [...Array(endNum - startNum+1).keys()].map((i) => i + startNum)
    //     setPageNumList([...newPageNumList]);
    // }

    useEffect(()=>{
        read_NoticeList();
        setIsAdmin(isCheckAdmin());
    },[selectedPage]);

    return(
        <>
            <div className="NoticeContainer">
                <div className="NoticeListBox">
                    <Title title='공지사항'/>
                    <CreateButton link={ isAdmin ? '/notice/create' : null}/>
                    {
                        noticeList?.map(notice => 
                            <NoticeItem key={notice.postId} noticeItem={notice}/>
                        )
                    } 
                    <Paging
                        pageNum={selectedPage}
                        countPerPage={pageSize}
                        totalItems={totalItemCnt ? totalItemCnt : 0}
                        handlePage={setSelectedPage}
                />
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Notice;