import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import RegistButton from '../components/RegistButton';

import { getCookie } from '../util/auth';
import axios from 'axios';

import '../styles/Til/TilCreate.scss';

const TilEdit = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const postId = path[path.length-1];
    
    const [ title, setTitle ] = useState(null);
    const [ tag, setTag ] = useState(null);
    const [ content, setContent ] = useState(null);

    const onHandleTitle = (e) => {
        setTitle(e.target.value);
    }

    const onHandleTag = (e) => {
        setTag(e.target.value);
    }

    const onHandleCancel = () => {
        navigate('/til')
    }

    const read_TilInfo = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${postId}`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                }
                ,withCredentials:true
            });
            console.log(response.data);
            if (response.status === 200){
                setContent(response.data.data.content);
                setTitle(response.data.data.title);
                setTag(response.data.data.tag);
            }else{
                // 모달창 데이터 전송 오류
                alert('TIL 데이터를 불러오는데 실패했습니다.');
                navigate('/til');
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/til');
        }
    }

    const put_TilInfo = async() => {
        if (title && tag && content){
            try{
                const postData = {
                    title:title,
                    tag: tag,
                    content:content,
                }
                const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${postId}`;
                const response = await axios.put(url,postData,{
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                    ,withCredentials:true
                });
                if (response.status === 200){
                    alert('수정 되었습니다.');
                    navigate('/til');
                }else{
                    alert('수정 실패하셨습니다.');
                    navigate('/til');
                }
            }catch(e){
                alert(e.response.data.message);
                navigate('/til');
            }
        }else{
            alert('제목 혹은 내용을 채워주세요');
        }
        
    };

    useEffect(()=>{
        read_TilInfo();
    },[])

    return(
        <div className="TilCreateCotainer">
            <h1 className='h1'>TIL 작성</h1>
            <div>
                <p className='p'>제목</p>
                <input
                    defaultValue={title || ""}
                    placeholder='제목을 입력해주세요.'
                    className='TilCreateTitle'
                    onChange={onHandleTitle}/>
            </div>
            <div>
                <p  className='p'>태그</p>
                <input
                    defaultValue={tag || ""}
                    placeholder='태그를 입력해주세요. (예: java, react)'
                    className='TilCreateTag'
                    onChange={onHandleTag}/>
            </div>
            <div className='TilCreateContentBox'>
                <p className='p'>본문</p>
                <TextEditor value={content} setValue={setContent}/>
            </div>
            <RegistButton 
                onHandleCancel={onHandleCancel}
                onHandleSave={put_TilInfo}/>
        </div>
    );
}

export default TilEdit;