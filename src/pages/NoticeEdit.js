import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

import TextEditor from '../components/TextEditor';
import RegistButton from '../components/RegistButton';
import Title from '../components/Title/Title';
import Footer from '../components/Footer';
import { getCookie } from '../util/auth';

import axios from "axios";

import '../styles/Notice/NoticeCreate.scss';

const NoticeCreate = () =>{

    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/');
    const postId = path[path.length-1];

    const [ title, setTitle ] = useState(null);
    const [ content, setContent ] = useState(null);
    const [ fileNameList, setFileNameList ] = useState([]);

    const onHandleTitle = (e) => {
        setTitle(e.target.value);
    }

    const onHandleAddFile = (e) => {
        const fileLists = e.target.files;
        let fileNameLists = [...fileNameList];

        for(let i=0; i < fileLists.length; i++){
            fileNameLists.push(fileLists[i].name);
        }

        if(fileNameLists.length > 5){
            fileNameLists = fileNameLists.slice(0,5);
        }

        setFileNameList(fileNameLists);
    }

    const onHandleDeleteFile = (id) => {
        setFileNameList(fileNameList.filter((_, index) => index !== id));
    };

    const onHandleCancel = () => {
        navigate('/notice')
    }

    const put_noticeInfo = async() => {
        if (title && content){
            try{
                const postData = {
                    title:title,
                    content:content,
                    fileUrl: 'test.com',
                }
                const url = `${process.env.REACT_APP_API_SERVER}/api/admin/posts/${postId}`;
                console.log(url);
                const response = await axios.put(url,postData,{
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                    ,withCredentials:true
                });
                if (response.status === 200){
                    alert('수정 되었습니다.');
                    navigate('/notice');
                }else{
                    alert('수정 실패하셨습니다.');
                    navigate('/notice');
                }
            }catch(e){
                alert(e.response.data.message);
                navigate('/notice');
            }
        }else{
            alert('제목 혹은 내용을 채워주세요');
        }
        
    };

    const read_noticeItem = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/posts/${postId}`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setContent(response.data.data.content);
                setTitle(response.data.data.title);
                // setFileNameList()
            }else{
                alert('데이터 통신에 실패하였습니다.');
                navigate('/notice');
            }
            
        }catch(e){
            alert(e.response.data.message);
            navigate('/error');
        }
    };

    useEffect(()=>{
        read_noticeItem();
    },[])

    return(
        <>
            <div className="NoticeCreateCotainer">
                <Title title={'공지사항 작성'}/>
                <div className='NoticeTitleBox'>
                    <p className='p'>제목</p>
                    <input
                        defaultValue={title || ''}
                        placeholder='제목을 입력해주세요.'
                        className='NoticeCreateTitle'
                        onChange={onHandleTitle}/>
                </div>
                <div className='NoticeContentBox'>
                    <p className='p'>본문</p>
                    <TextEditor value={content} setValue={setContent}/>
                </div>
                <div className='FileUploadBox'>
                <input 
                    type="file" 
                    id="input-file" 
                    multiple 
                    className="FileUpload" 
                    style={{display:"none"}}
                    onChange={onHandleAddFile}
                    />
                    <label htmlFor="input-file" className='FileUpload'>
                        <div className='FileUpload' >파일 업로드</div>
                    </label>
                    <div className='FileItemBox'>
                    {
                        fileNameList?.map((file, idx) => (
                            <div key={idx} className='FileItem'>
                                <div className='FileName'>{file}</div>
                                <MdOutlineCancel className='FileDelete' onClick={() => onHandleDeleteFile(idx)}/>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <RegistButton
                    onHandleCancel={onHandleCancel}
                    onHandleSave={put_noticeInfo}/>
            </div>
            <Footer/>
        </>
    );
}

export default NoticeCreate