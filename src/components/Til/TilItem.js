import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { Viewer } from '@toast-ui/react-editor';
import axios from "axios";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../../styles/Til/TilItem.scss';
import { useState } from "react";


const TilItem = () =>{

    const [ isClosed, setIsClosed ] = useState(true);


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
        alert(id);
    }

    const onChangeIsClosed = () =>{
        setIsClosed(!isClosed);
    }
    return(
        <div className={isClosed ? "TilItemBox": "TilItemBox2"}>
            <div className="TilHeaderBox">
                <img src={tilDummyData.profileImgUrl} alt="프로필" className='Profile'/>
                <p className="TilDetailTile">2023-06-12 TIL</p>
                <div className="EditButton">
                    <AiTwotoneEdit/>
                </div>
                <div className="DeleteButton" onClick={()=>onDeleteTIL(1)}>
                    <AiFillDelete/>
                </div>
            </div>
            <div className="TilContentBox">
                {/* <div className={isClosed ? 'ClosedContent' : "NotClosedContent"}>{tilDummyData.content}</div> */}
                <Viewer
                    className={isClosed ? "ClosedContent" : "NotClosedContent"}       
                    initialValue={tilDummyData.content}
                />
            </div>
            {
                isClosed ? 
                <div className="TilMoreSeeBox" onClick={()=>onChangeIsClosed()}>
                    더 보기
                </div> : <></>
            }
        </div>
    );
}

export default TilItem;