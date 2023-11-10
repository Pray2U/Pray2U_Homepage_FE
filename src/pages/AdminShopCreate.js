import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';

import Footer from "../components/Footer";
import RegistButton from '../components/RegistButton';
import Title from "../components/Title/Title";

import '../styles/Admin/AdminShopCreate.scss';
import { getCookie, isCheckAdmin } from '../util/auth';
import { uploadFile } from '../util/s3Upload';


const AdminShopCreate = () => {

    const navigate = useNavigate();

    const [ itemName, setItemName ] = useState(null);
    const [ itemPoint, setItemPoint ] = useState(null);
    const [ itemDescription, setItemDescription ] = useState(null);
    const [ itemImg, setItemImg ] = useState(null);

    const onHandleItemName = (e) => {
        setItemName(e.target.value);
    }

    const onHandleItemPoint = (e) => {
        setItemPoint(e.target.value);
    }
    
    const onHandleItemDescription = (e) => {
        setItemDescription(e.target.value);
    }
    
    const onHandleItemImgUrl = (e) => {
        if(e.target.files[0]){
            setItemImg(e.target.files[0]);
        }
    }

    const onHandleCancel = () => {
        navigate('/admin/shop');
    }
    
    const onHandleDeleteFile = () => {
        setItemImg(null);
    };

    const post_ItemInfo = async() => {
        try{
            if(itemName && itemImg && itemPoint && itemDescription){
                const imgUrl = await uploadFile(itemImg);
                console.log(imgUrl);
                if(imgUrl){
                    const postData = {
                        imgUrl: imgUrl,
                        itemDescription: itemDescription,
                        itemName: itemName,
                        point: parseInt(itemPoint)
                    };
                    const url = `${process.env.REACT_APP_API_SERVER}/api/admin/items`;
                    const response = await axios.post(url,postData,{
                        headers: {
                            Authorization: `Bearer ${getCookie('accessToken')}`
                        },
                        withCredentials:true,
                    });
                    if(response.status === 200){
                        alert('상품이 등록되었습니다.')
                        navigate('/admin/shop');
                    }else{
                        alert('등록 오류입니다.');
                        navigate('/admin/shop');
                    }
                }
            }else{
                alert("입력이 제대로 되지 않았습다.");
            }
        }catch(e){
            alert(e);
            navigate('/error');
        }
    }

    useEffect(()=>{
        const isAdmin = isCheckAdmin();
        if(!isAdmin){
            navigate('/error');
        }
    },[]);

    return(
        <>
            <div className="AdminShopCreateContainer">
                <Title title={"아이템 등록"}/>
                <div className='AdminShopCreateBox'>
                    <p className='p'>상품명</p>
                    <input
                        placeholder='상품명'
                        className='AdminShopCreateItemName'
                        onChange={onHandleItemName}/>
                </div>
                <div className='AdminShopCreateBox'>
                    <p className='p'>상품 포인트</p>
                    <input
                        placeholder='상품 포인트'
                        className='AdminShopCreateItemPoint'
                        onChange={onHandleItemPoint}/>
                </div>
                <div className='AdminShopCreateBox'>
                    <p className='p'>상품 설명</p>
                    <textarea
                        placeholder='상품 설명을 적어주세요.'
                        className='AdminShopCreateItemDescription'
                        onChange={onHandleItemDescription}/>
                </div>
                <div className='FileUploadBox'>
                    <input 
                        type="file" 
                        id="input-file"
                        accept="image/*"
                        className="FileUpload" 
                        style={{display:"none"}}
                        onChange={onHandleItemImgUrl}
                        />
                        <label htmlFor="input-file" className='FileUpload'>
                            <div className='FileUpload'>파일 업로드</div>
                        </label>
                        {
                            itemImg?.name ? 
                            <div className='FileItemBox'>
                                <div className='FileItem'>
                                    <div className='FileName'>{itemImg?.name}</div>
                                    <MdOutlineCancel className='FileDelete' onClick={() => onHandleDeleteFile()}/>
                                </div>
                            </div>
                            : <></>
                        }
                </div>
                <RegistButton
                    onHandleCancel={onHandleCancel}
                    onHandleSave={post_ItemInfo}/>
            </div>
            <Footer/>
        </>
    )
}

export default AdminShopCreate;