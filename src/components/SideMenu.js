import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import '../styles/SideMenu/SideMenu.scss';

const SideMenu = ({onToggle, onRemove, isMyPost}) => {

    const [ isMenuModal, setIsMenuModal ] = useState(false);

    return(
        <div className='SideMenuContainer'>
            <AiOutlineMenu className='SideMenuIcon' onClick={()=>setIsMenuModal(!isMenuModal)}/>
            {/* <BsThreeDotsVertical className='SideMenuIcon' onClick={()=>setIsMenuModal(!isMenuModal)}/> */}
            {
                isMenuModal ? 
                <div className='SideMenuButtonsBox'>
                    {
                        isMyPost && <div className='SideMenuButton' onClick={onToggle}>수정하기</div>
                    }
                    <div className='SideMenuButton' onClick={onRemove}>삭제하기</div>
                </div> : <></>
            }
        </div>
    )
};

export default SideMenu;
