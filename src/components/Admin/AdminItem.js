import { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { timeTrans } from '../../util/time';

import AdminItemModal from '../Modal/AdminItemModal';

import '../../styles/Admin/AdminItem.scss';
import dayjs from 'dayjs';

const AdminItem = ({itemInfo, onToggle, onRemove}) => {

    const [ isModalView, setIsModalView ] = useState(false);

    return(
        <div className="AdminItemContainer">
            <div className='AdminItemImgName'>
                <img src={itemInfo?.imgUrl} className='AdminItemImg' alt='상품 이미지'/>
                <div className='AdminItemName'>{itemInfo?.itemName}</div>
            </div>
            <div className='AdminItemPrice'>{itemInfo?.point}</div>
            <div className='AdminItemCreate'>{dayjs(itemInfo?.createdDate).format('YYYY-MM-DD')}</div>
            <div className='AdminItemModify'>{dayjs(itemInfo?.modifiedDate).format('YYYY-MM-DD')}</div>
            {
                isModalView ? <AdminItemModal onToggle={onToggle} onRemove={()=>onRemove(itemInfo?.itemId)}/> : <></>
            }
            <AiOutlineUnorderedList className="AdminItemSetting" onClick={()=>setIsModalView(!isModalView)}/>
        </div>
    );
}

export default AdminItem;