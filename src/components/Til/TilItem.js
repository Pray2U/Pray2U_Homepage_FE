import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../../styles/Til/TilItem.scss';


const TilItem = ({tilInfo}) =>{

    const navigate = useNavigate();

    const [ isClosed, setIsClosed ] = useState(true);
    const [ isOverContent, setIsOverContent ] = useState(true);


     // 테스트 더미
    const tilDummyData = {
        profileImgUrl: "/profile/HeaderProfile.png",
        title: "2023-06-14 TIL",
        content: `안녕하시지?
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
    }


    const onDeleteTIL = (id) => {
        // 모달창 띄우기 확인 누를 시 데이터 통신
        console.log(id);
    }
    
    const onEditTIL = (id) => {
        navigate(`/til/edit/${id}`);
    }

    const onChangeIsClosed = () =>{
        setIsClosed(!isClosed);
    }

    return(
        <div className={isClosed ? "TilItemBox": "TilItemBox2"}>
            <div className="TilHeaderBox">
                <img src={tilInfo?.profileImgUrl} alt="프로필" className='Profile'/>
                <p className="TilDetailTile">{tilInfo?.titile}</p>
                <div className="EditButton" onClick={()=>onEditTIL(tilInfo.tilId)}>
                    <AiTwotoneEdit/>
                </div>
                <div className="DeleteButton" onClick={()=>onDeleteTIL(tilInfo.tilId)}>
                    <AiFillDelete/>
                </div>
            </div>
            <div className="TilContentBox">
                {/* <div className={isClosed ? 'ClosedContent' : "NotClosedContent"}>{tilDummyData.content}</div> */}
                <Viewer
                    className={isClosed ? "ClosedContent" : "NotClosedContent"}
                    overflow="hidden"
                    initialEditType="markdown"
                    initialValue={tilDummyData?.content}
                />
            </div>
            {
                isOverContent ? 
                <div className="TilMoreSeeBox" onClick={()=>onChangeIsClosed()}>
                    {isClosed ? "더보기" : "접기"}
                </div> 
                : <></>
            }
        </div>
    );
}

export default TilItem;