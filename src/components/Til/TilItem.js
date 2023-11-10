import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

import Reconfirm from '../../components/Reconfirm';

import '../../styles/Til/TilItem.scss';


const TilItem = ({tilInfo, onRemove, myInfo}) =>{

    const navigate = useNavigate();

    const [ isClosed, setIsClosed ] = useState(true);
    const [ isOverContent, setIsOverContent ] = useState(true);
    const [ isModalView, setIsModalView ] = useState(false);

    const onDeleteTIL = async (id) => {
        onRemove(id);
    }
    
    const onEditTIL = (id) => {
        navigate(`/til/edit/${id}`);
    }

    const onChangeIsClosed = () =>{
        setIsClosed(!isClosed);
    }

    const checkOverContents = () =>{
        const contentLine = tilInfo?.content.split('/');
        const length = contentLine.length;
        if (length >= 8){
            setIsOverContent(true);
        }else{
            setIsOverContent(false);
        }
    }

    useEffect(()=>{
        checkOverContents();
    },[]);

    return(
        <div className={isClosed ? "TilItemBox": "TilItemBox2"}>
            <div className="TilHeaderBox">
                <img src={tilInfo?.user?.writerProfileImg} alt="프로필" className='Profile'/>
                <div className="TilDetailTile">{tilInfo?.title}</div>
                {
                    tilInfo?.userId === myInfo?.user?.writerId ?
                    <div className="TilButtons">
                        <div className="EditButton" onClick={()=>onEditTIL(tilInfo?.tilId)}>
                            <AiTwotoneEdit/>
                        </div>
                        <div className="DeleteButton" onClick={()=>setIsModalView(true)}>
                            <AiFillDelete/>
                        </div>
                    </div>
                    : <></>
                }
            </div>
            <div className={isClosed ? "TilContentBox" : "TilContentBox2"}>
                {/* <Viewer
                    initialEditType="markdown"
                    initialValue={tilInfo?.content}
                /> */}
                {
                    parse(tilInfo?.content)
                }
            </div>
            {
                isOverContent ? 
                <div className="TilMoreSeeBox" onClick={()=>onChangeIsClosed()}>
                    {isClosed ? "더보기" : "접기"}
                </div> 
                : <></>
            }
            {
                isModalView ? <Reconfirm
                    message="삭제하시겠습니까?"
                    button1='취소'
                    button2='삭제'
                    onCancel={setIsModalView(false)}
                    onCheck={()=>onDeleteTIL(tilInfo?.tilId)}
                />  
                : <></>
            }
        </div>
    );
}

export default TilItem;