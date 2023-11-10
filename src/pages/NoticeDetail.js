import { useState, useEffect  } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
// import { AiOutlineEye } from "react-icons/ai";
import parse from 'html-react-parser';
import axios from "axios";

import CommentForm from "../components/Comment/CommentForm";
import SideMenu from "../components/SideMenu";

import { getCookie, isCheckAdmin } from "../util/auth";
import { noticeTime } from "../util/time";

import '../styles/Notice/NoticeDetail.scss';


const NoticeDetail = () =>{

    const location = useLocation();
    const navigate = useNavigate();
    const pathList = location.pathname.split('/');
    const postId = pathList[pathList.length-1];

    const [ noticeInfo, setNoticeInfo ] = useState(null);
    const [ fileList, setFileList ] = useState(null);
    const [ myInfo, setMyInfo ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(false);

    
    const read_NoticeItem = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${postId}`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setNoticeInfo(response.data.data);
                setFileList(response.data.data.fileUrl?.split(','));
            }else{
                alert('데이터 통신에 실패하였습니다.');
                navigate('/error');
            }
            
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
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
            }else{
                alert('내 정보를 가져오지 못했습니다.');
            }
            
        }catch(e){
            alert('서버 오류');
            navigate('/error');
        }
    };

    const delete_NoticeItem = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/admin/posts/${postId}`;
            const response = await axios.delete(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                alert('공지사항이 삭제되었습니다.');
                navigate('/notice');
            }else{
                alert('데이터 통신에 실패하였습니다.');
                navigate('/');
            }
            
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    }

    const onToggle = () => {
        navigate(`/notice/edit/${postId}`);
    }

    useEffect(()=>{
        read_NoticeItem();
        read_myInfo();
        setIsAdmin(isCheckAdmin());
    },[]);

    return(
        <div className="NoticeDetailContainer">
            <div className="NoticeDetailHeader">
                <p className="NoticeCategory">공지사항&nbsp;&nbsp;Notice</p>
                <div className="NoticeHeaderBox">
                    <h1 className="NoticeHeaderTitle">{noticeInfo?.title}</h1>
                    {
                        isAdmin ?  
                        <SideMenu 
                            onToggle={onToggle}
                            onRemove={delete_NoticeItem}/>  
                        : <></>
                    }
                </div>
                <div className="NoticeDetailInfo">
                    <img src={noticeInfo?.user?.writerProfileImg} alt="프로필" className="NoticeDetailProfile"/>
                    <div className='NoticeDetailWriter'>{noticeInfo?.user?.writerName}</div>
                    {/* <AiOutlineEye className="NoticeEyeIcon"/>
                    <div className='NoticeWatchCnt'>{noticeInfo?.cnt}</div> */}
                    <div className='NoticeTime'>{noticeTime(noticeInfo?.createDate)}</div>
                </div>
            </div>
            <div className="NoticeContents">
                {parse(`${noticeInfo?.content}`)}
            </div>
            {
                fileList ?
                <div className="NoticeFileBox">
                {
                    fileList?.map(fileUrl => 
                        <div className="NoticeFileItem" key={fileUrl}>
                            <div className="NoticeFileName">{decodeURI(fileUrl.split('_')[1])}</div>
                            <Link to={fileUrl} className="FileDownload">
                                <AiOutlineDownload className="FileDownloadIcon"/>
                            </Link>
                        </div>
                        
                    )
                }
                </div> : <></>
            }
            {
                postId ? <CommentForm id={postId} myInfo={myInfo} /> : <></>
            }
        </div>
    );
}

export default NoticeDetail;