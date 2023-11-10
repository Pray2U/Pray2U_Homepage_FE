import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getCookie } from '../util/auth';

import TextEditor from '../components/TextEditor';
import RegistButton from '../components/RegistButton';
import Footer from '../components/Footer';
import Title from '../components/Title/Title';

import '../styles/Til/TilCreate.scss';

const TilCreate = () =>{

    const navigate = useNavigate();

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

    const post_TilInfo = async() => {
        if (title && tag && content){
            try{
                const postData = {
                    title:title,
                    tag: tag,
                    content:content,
                }
                const url = `${process.env.REACT_APP_API_SERVER}/api/tils`;
                const response = await axios.post(url,postData,{
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                    ,withCredentials:true
                });
                console.log(response);
                if (response.status === 200){
                    alert('등록되었습니다.');
                    navigate('/til');
                }else{
                    alert('등록 실패하셨습니다.');
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

    return(
        <>
            <div className="TilCreateCotainer">
                <Title title={"TIL 작성"}/>
                <div className=' TilCreateTitleBox'>
                    <p className='p'>제목</p>
                    <input
                        placeholder='제목을 입력해주세요.'
                        className='TilCreateTitle'
                        onChange={onHandleTitle}/>
                </div>
                <div className='TilCreateTagBox'>
                    <p className='p'>태그</p>
                    <input 
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
                    onHandleSave={post_TilInfo}/>
            </div>
            <Footer/>
        </>
    );
}

export default TilCreate;